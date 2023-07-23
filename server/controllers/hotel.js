const hotel = require('../models/hotel')
// const redis = require('../config/redis')

class HotelController {
    static async create(req, res, next) {
        try {
            const { name, description, phoneNumber, mainImage, location, lat, long, HotelImage, HotelRoom, HotelFacility } = req.body

            if (!name) throw { name: 'HotelEmptyName' }
            if (!description) throw { name: 'HotelEmptyDescription' }
            if (!phoneNumber) throw { name: 'HotelEmptyPhoneNumber' }
            if (!mainImage) throw { name: 'HotelEmptyMainImage' }
            if (!location) throw { name: 'HotelEmptyLocation' }
            if (!lat) throw { name: 'HotelEmptyLat' }
            if (!long) throw { name: 'HotelEmptyLong' }

            const createHotelRoom = HotelRoom?.map(el => {
                el.HotelRoomFacility = {
                    create: el.HotelRoomFacility
                }
                return el
            })

            await hotel.create({
                data: {
                    name, description, phoneNumber, mainImage, location, lat, long, rating: 0,
                    HotelImage: {
                        create: HotelImage
                    },
                    HotelRoom: {
                        create: createHotelRoom
                    },
                    HotelFacility: {
                        create: HotelFacility
                    }
                }
            })

            // const keys = await redis.keys('hotels')
            // if (keys && keys.length > 0) await redis.del(keys)

            res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'Successfully create new hotel'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async findFacilities(req, res, next) {
        try {
            const data = await hotel.findFacilities({})

            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            next(err)
        }
    }

    static async addFacility(req, res, next) {
        try {
            const { name, type } = req.body

            if (!name) throw { name: 'FacilityEmptyName' }
            if (!type) throw { name: 'FacilityEmptyType' }

            await hotel.addFacility({
                data: {
                    name, type
                }
            })

            // const keys = await redis.keys('hotels')
            // if (keys && keys.length > 0) await redis.del(keys)

            res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'Successfully create new facility'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async findAll(req, res, next) {
        try {

            const { search } = req.query

            // if (!search) {
            //     const hotelsCache = await redis.get('hotels')
            //     if (hotelsCache) {
            //         return res.status(200).json({
            //             statusCode: 200,
            //             data: JSON.parse(hotelsCache)
            //         })
            //     }
            // }

            const data = await hotel.findAll({
                where: {
                    name: {
                        contains: search
                    }
                },
                include: {
                    HotelImage: true,
                    HotelRoom: {
                        include: {
                            HotelRoomImage: true,
                            HotelRoomFacility: true,
                            HotelRoom360Image: true
                        }
                    },
                    HotelFacility: {
                        include: {
                            Facility: true
                        }
                    }
                }
            })

            const result = data?.map(el => {
                const prices = el?.HotelRoom?.map(room => room?.price || 0)
                el.lowestPrice = prices.reduce((previous, current)=> current < previous ? current : previous)
                return el
            })

            // redis.set('hotels', JSON.stringify(result))

            res.status(200).json({
                statusCode: 200,
                data: result
            })
        } catch (err) {
            next(err)
        }
    }

    static async findOne(req, res, next) {
        try {
            const { id } = req.params
            const { id: userId } = req.userData
            const data = await hotel.findOne({
                where: { id },
                include: {
                    Bookmark: true,
                    HotelImage: true,
                    HotelRoom: {
                        include: {
                            HotelRoomImage: true,
                            HotelRoomFacility: true,
                            HotelRoom360Image: true
                        }
                    },
                    HotelFacility: {
                        include: {
                            Facility: true
                        }
                    }
                }
            })

            if (!data) throw { name: 'NotFound' }

            const newData = {
                ...data,
                lowestPrice: data?.HotelRoom?.reduce((previous, current) => current < previous ? current : previous),
                isBookmarked: data?.Bookmark?.some(el => el.UserId === userId)
            }

            res.status(200).json({
                statusCode: 200,
                data: newData
            })
        } catch (err) {
            next(err)
        }
    }

    static async updateRating(req, res, next) {
        try {
            const { id } = req.params
            const { rating } = req.body

            if (!rating) throw { name: 'HotelEmptyRating' }

            const findHotel = await hotel.findOne({
                where: { id }
            })

            if (!findHotel) throw { name: 'NotFound' }

            await hotel.update({
                where: { id },
                data: {
                    rating
                }
            })

            // const keys = await redis.keys('hotels')
            // if (keys && keys.length > 0) await redis.del(keys)

            res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'Successfully update hotel rating'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = HotelController