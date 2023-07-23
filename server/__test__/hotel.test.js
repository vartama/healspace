const request = require('supertest')
const app = require('../app')
const user = require('../models/user')
const hotel = require('../models/hotel')
let access_token = ''
let userId = ''
let hotelRoomId = ''
let hotelId = ''

afterAll(async () => {
    try {
        await user.deleteAll({})
        await hotel.deleteAll({})
        await hotel.deleteAllFacility({})
    } catch (err) {
        console.log(err, '<<< error afterAll');
    }
})

describe('POST /hotels', () => {
    it('success register 201', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: 'testing@gmail.com',
                password: 'testing',
                fullName: 'Testing',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully register new user')
    })

    it('success login 200', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: 'testing@gmail.com',
                password: 'testing'
            })
            .set("Accept", "application/json")
        access_token = response.body.access_token
        userId = response.body.data.id
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('access_token')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('id')
        expect(response.body.data).toHaveProperty('email')
        expect(response.body.data).toHaveProperty('fullName')
        expect(response.body.data).toHaveProperty('age')
        expect(response.body.data).toHaveProperty('gender')
        expect(response.body.data).toHaveProperty('phoneNumber')
        expect(response.body.data).toHaveProperty('dateOfBirth')
        expect(response.body.data).not.toHaveProperty('password')
    })

    it('success add hotel 201', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully create new hotel')
    })

    it('failed add hotel 400 : empty name', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Name is required')
    })

    it('failed add hotel 400 : empty desc', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "",
                phoneNumber: "02180634899",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Description is required')
    })

    it('failed add hotel 400 : empty phone', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Phone Number is required')
    })

    it('failed add hotel 400 : empty main image', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                mainImage: "",
                location: "BSD",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Main Image is required')
    })

    it('failed add hotel 400 : empty location', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Location is required')
    })

    it('failed add hotel 400 : empty lat', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Lat is required')
    })

    it('failed add hotel 400 : empty Long', async () => {
        const response = await request(app)
            .post('/hotels')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "106.63700014090564",
                long: "",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Long is required')
    })

    it('failed add hotel 401', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                name: "Hotel Santika Premiere ICE - BSD City",
                description: "From business event to corporate gathering, Hotel Santika Premiere ICE - BSD City provides complete services and facilities that you and your colleagues need.\n\nBe ready to get the unforgettable stay experience by its exclusive service, completed by a full range of facilities to cater all your needs.\n\n24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do not hesitate to ask the front desk, we are always ready to accommodate you.\n\nSavor your favorite dishes with special cuisines from Hotel Santika Premiere ICE - BSD City exclusively for you.\n\nWiFi is available within public areas of the property to help you to stay connected with family and friends.\n\nHotel Santika Premiere ICE - BSD City is a hotel with great comfort and excellent service according to most hotel's guests.\n\nGet precious and unforgettable moment during your stay at Hotel Santika Premiere ICE - BSD City.",
                phoneNumber: "02180634899",
                rating: 0,
                mainImage: "https://lh5.googleusercontent.com/p/AF1QipMWnMdukyFU9BECsKniq7fOLwc7IzhivIvpEplr=w408-h271-k-no",
                location: "BSD",
                lat: "106.63700014090564",
                long: "-6.2986375413492555",
                HotelRoom: [
                    {
                        name: "Deluxe King",
                        description: "Room Information\n28.0 sqm\n2 guests",
                        type: "Deluxe King",
                        mainImage: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10008469-1800x1200-FIT_AND_TRIM-e899721cd4809be880d61c48494ff7e7.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550",
                        price: 845500
                    }
                ]
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('GET /hotels', () => {
    it('success fetch 200', async () => {
        const response = await request(app)
            .get('/hotels')
            .set({ access_token, Accept: "application/json" })
        hotelId = response.body.data[0].id
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
    })

    it('failed fetch 404', async () => {
        const response = await request(app)
            .get('/hotels')
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('GET /hotels/:id', () => {
    it('success fetch 200', async () => {
        const response = await request(app)
            .get(`/hotels/${hotelId}`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
    })

    it('failed fetch 401', async () => {
        const response = await request(app)
            .get(`/hotels/${hotelId}`)
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })

    it('failed fetch 404', async () => {
        const response = await request(app)
            .get(`/hotels/4345`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Data not found')
    })
})

describe('PUT /hotels/:id/rating', () => {
    it('success 200', async () => {
        const response = await request(app)
            .put(`/hotels/${hotelId}/rating`)
            .send({ rating: 50 })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully update hotel rating')
    })

    it('failed 400', async () => {
        const response = await request(app)
            .put(`/hotels/${hotelId}/rating`)
            .send({})
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Rating is required')
    })

    it('failed 401', async () => {
        const response = await request(app)
            .put(`/hotels/${hotelId}/rating`)
            .send({ rating: 50 })
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })

    it('failed 404', async () => {
        const response = await request(app)
            .put(`/hotels/124323/rating`)
            .send({ rating: 50 })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Data not found')
    })
})

describe('POST /hotels/facilities', () => {
    it('success 201', async () => {
        const response = await request(app)
            .post(`/hotels/facilities`)
            .send({
                name: 'Gym',
                type: 'gym'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully create new facility')
    })

    it('failed 400 : empty name', async () => {
        const response = await request(app)
            .post(`/hotels/facilities`)
            .send({
                name: '',
                type: 'gym'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Name is required')
    })

    it('failed 400 : empty type', async () => {
        const response = await request(app)
            .post(`/hotels/facilities`)
            .send({
                name: 'gym',
                type: ''
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Type is required')
    })

    it('failed 401', async () => {
        const response = await request(app)
            .post(`/hotels/facilities`)
            .send({
                name: 'Gym',
                type: 'gym'
            })
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('GET /hotels/facilities', () => {
    it('success 200', async () => {
        const response = await request(app)
            .get(`/hotels/facilities`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
    })

    it('failed 401', async () => {
        const response = await request(app)
            .get(`/hotels/facilities`)
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})