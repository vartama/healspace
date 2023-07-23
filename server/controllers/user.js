const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'the-secret-key'

class UserController {
    static getAge(dateOfBirth) {
        const now = new Date();
        const birth = new Date(dateOfBirth);
        const age = now.getFullYear() - birth.getFullYear();
        if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    static exclude(user, keys) {
        return Object.fromEntries(
            Object.entries(user).filter(([key]) => !keys.includes(key))
        )
    }

    static async findOne(req, res, next) {
        try {
            const { id } = req.userData
            let data = await user.findOne({
                where: {
                    id
                }
            })

            if (!data) throw { name: 'NotFound' }

            data = {
                ...UserController.exclude(data, ['password']),
                age: UserController.getAge(data.dateOfBirth)
            }
            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            next(err)
        }
    }

    static async findBookmarks(req, res, next) {
        try {
            const { id: userId } = req.userData
            const data = await user.findBookmarks({
                where: {
                    UserId: userId,
                },
                include: {
                    Hotel: true
                }
            })

            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            next(err)
        }
    }

    static async findBookmark(req, res, next) {
        try {
            const { id } = req.params
            const data = await user.findBookmark({
                where: {
                    id
                },
                include: {
                    Hotel: true
                }
            })

            if (!data) throw { name: 'NotFound' }

            res.status(200).json({
                statusCode: 200,
                data
            })
        } catch (err) {
            next(err)
        }
    }

    static async addBookmark(req, res, next) {
        try {
            const { id: userId } = req.userData
            const { id } = req.params

            const findBookmark = await user.findBookmark({
                where: {
                    UserId: userId,
                    HotelId: id
                }
            })

            if (findBookmark) throw { name: 'BookmarkAlreadyExist' }

            await user.addBookmark({
                data: {
                    UserId: userId,
                    HotelId: id
                }
            })

            res.status(201).json({
                statusCode: 200,
                data: {
                    message: 'Successfully add new bookmark'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteBookmark(req, res, next) {
        try {
            const { id: userId } = req.userData
            const { id } = req.params

            const findBookmark = await user.findBookmark({
                where: {
                    UserId: userId,
                    HotelId: id
                }
            })

            if (!findBookmark) throw { name: 'NotFound' }

            await user.deleteBookmark({
                where: {
                    id: findBookmark.id
                }
            })

            res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'Successfully delete bookmark'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: 'LoginEmptyEmail' }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) throw { name: 'LoginInvalidEmail' }
            if (!password) throw { name: 'LoginEmptyPassword' }

            let findUser = await user.findOne({
                where: {
                    email
                }
            })

            if (!findUser) throw { name: 'LoginError' }
            if (!bcrypt.compareSync(password, findUser.password)) throw { name: 'LoginError' }
            findUser = {
                ...UserController.exclude(findUser, ['password']),
                age: UserController.getAge(findUser.dateOfBirth)
            }
            res.status(200).json({
                statusCode: 200,
                access_token: jwt.sign({ id: findUser.id, email: findUser.email }, JWT_SECRET_KEY),
                data: findUser
            })
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, password, fullName, gender, dateOfBirth, phoneNumber } = req.body

            if (!email) throw { name: 'RegisterEmptyEmail' }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) throw { name: 'RegisterInvalidEmail' }
            if (!password) throw { name: 'RegisterEmptyPassword' }
            if (!fullName) throw { name: 'RegisterEmptyFullName' }
            if (!gender) throw { name: 'RegisterEmptyGender' }
            if (!dateOfBirth) throw { name: 'RegisterEmptyDateOfBirth' }
            if (!phoneNumber) throw { name: 'RegisterEmptyPhoneNumber' }

            const findUser = await user.findOne({
                where: {
                    email
                }
            })

            if (findUser) throw { name: 'RegisterUniqueEmail' }

            const salt = bcrypt.genSaltSync(10)
            await user.create({
                data: {
                    email, password: bcrypt.hashSync(password, salt), fullName, gender, dateOfBirth, phoneNumber
                }
            })

            res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'Successfully register new user'
                }
            })
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.userData
            const { email, password, fullName, gender, dateOfBirth, phoneNumber } = req.body

            if (!email) throw { name: 'UpdateUserEmptyEmail' }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) throw { name: 'UpdateUserInvalidEmail' }
            if (!password) throw { name: 'UpdateUserEmptyPassword' }
            if (!fullName) throw { name: 'UpdateUserEmptyFullName' }
            if (!gender) throw { name: 'UpdateUserEmptyGender' }
            if (!dateOfBirth) throw { name: 'UpdateUserEmptyDateOfBirth' }
            if (!phoneNumber) throw { name: 'UpdateUserEmptyPhoneNumber' }

            const findUserEmail = await user.findOne({
                where: { email }
            })

            if (findUserEmail && findUserEmail.id !== id) throw { name: 'UpdateUserUniqueEmail' }

            const findUser = await user.findOne({
                where: {
                    id
                }
            })

            if (!findUser) throw { name: 'NotFound' }

            await user.update({
                where: { id },
                data: {
                    email, password, fullName, gender, dateOfBirth, phoneNumber, updatedAt: new Date()
                }
            })

            res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'Successfully update user data'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController