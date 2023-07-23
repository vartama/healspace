const order = require('../models/order')
const admin = require('../config/firebase')
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || ''
const PAYPAL_APP_SECRET = process.env.PAYPAL_APP_SECRET || ''
const axios = require('axios')
const BASE_URL = 'https://api-m.sandbox.paypal.com'
const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")
const stripe = require('stripe')('sk_test_51NNXnDLbn6jkqEOPe01zNju5NSQMMw7gjTWgNb2LxauiN71Rz0SzyzuIrHM5KCNtFETGQm7OXTjYu3FyCQPj6eZx00V7Mju4A1')


class OrderController {
    static async createStripeOrder(req, res, next) {
        try {
            const { id: userId, email } = req.userData

            const { hotelRoomId, totalPrice, checkInAt, checkOutAt, customerName, customerEmail, customerPhoneNumber } = req.body

            if (!hotelRoomId) throw { name: 'OrderEmptyHotelRoomId' }
            if (!totalPrice) throw { name: 'OrderEmptyTotalPrice' }
            if (!checkInAt) throw { name: 'OrderEmptyCheckInAt' }
            if (!checkOutAt) throw { name: 'OrderEmptyCheckOutAt' }
            if (!customerName) throw { name: 'OrderEmptyCustomerName' }
            if (!customerEmail) throw { name: 'OrderEmptyCustomerEmail' }
            if (!customerPhoneNumber) throw { name: 'OrderEmptyCustomerPhoneNumber' }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalPrice,
                currency: 'sgd',
                automatic_payment_methods: { enabled: true },
            })

            const newOrder = await order.create({
                data: {
                    HotelRoom: {
                        connect: { id: hotelRoomId }
                    },
                    paypalOrderId: paymentIntent.id,
                    paypalPaymentUrl: paymentIntent.client_secret,
                    totalPrice: +totalPrice,
                    checkInAt, checkOutAt,
                    customerName,
                    customerEmail,
                    customerPhoneNumber,
                    User: {
                        connect: { id: userId }
                    },
                    status: 'Pending',
                    createdAt: new Date()
                }
            })

            await OrderController.sendFirebase(userId, 'HealSpace', 'Segera lakukan pembayaran')

            let config = {
                service: "gmail",
                auth: {
                    user: process.env.EMAIL || '',
                    pass: process.env.PASSWORD || ''
                }
            }

            let transporter = nodemailer.createTransport(config)

            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: "Mailgen",
                    link: "https://mailgen.js"
                }
            })

            const findOrder = await order.findOne({
                where: { id: newOrder.id },
                include: {
                    HotelRoom: true
                }
            })

            let response = {
                body: {
                    name: "Heal Space",
                    intro: "Terimakasih sudah menggunakan layanan kami",
                    table: {
                        data: [
                            {
                                item: findOrder?.HotelRoom?.name,
                                description: findOrder?.HotelRoom?.name,
                                price: findOrder?.totalPrice
                            }
                        ]
                    },
                    outro: "Salam, Heal Space"
                }
            }

            let mail = MailGenerator.generate(response)

            let message = {
                from: "ahmadghafirin@gmail.com",
                to: email,
                subject: "Place Order",
                html: mail
            }

            await transporter.sendMail(message)

            res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'Successfully create new order',
                    order: findOrder
                }
            })
        } catch (err) {
            console.log(err?.response?.data, '<<<<error create paypal');
            next(err)
        }
    }

    static async sendFirebase(userId, title, message) {
        try {
            const messagePayload = {
                notification: {
                    title,
                    body: message,
                },
                topic: userId
            }
            await admin.database().ref('message').push(messagePayload)
            const response = await admin.messaging().send(messagePayload)
            return response
        } catch (err) {
            throw err
        }
    }

    static async findAll(req, res, next) {
        try {
            const { id: userId } = req.userData
            const data = await order.findAll({
                where: {
                    UserId: userId
                },
                include: {
                    HotelRoom: {
                        include: {
                            Hotel: true,
                            HotelRoomImage: true,
                            HotelRoomFacility: true,
                            HotelRoom360Image: true
                        }
                    },
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

    static async findOne(req, res, next) {
        try {
            const { id } = req.params
            const { id: userId } = req.userData
            const data = await order.findOne({
                where: {
                    id,
                    UserId: userId
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

    static async updateStatus(req, res, next) {
        try {
            const { id } = req.params
            const { id: userId } = req.userData
            const { status } = req.body

            if (!status) throw { name: 'UpdateOrderEmptyStatus' }

            const findOrder = await order.findOne({
                where: {
                    id,
                    UserId: userId
                }
            })

            if (!findOrder) throw { name: 'NotFound' }

            await order.update({
                where: { id },
                data: {
                    status
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: {
                    message: 'Successfully update order status'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrderController