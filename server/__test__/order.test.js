const request = require('supertest')
const app = require('../app')
const user = require('../models/user')
const hotel = require('../models/hotel')
const order = require('../models/order')
const orderController = require('../controllers/order')
let access_token = ''
let userId = ''
let orderId = ''
let hotelRoomId = ''

afterAll(async () => {
    try {
        await order.deleteAll({})
        await user.deleteAll({})
        await hotel.deleteAll({})
    } catch (err) {
        console.log(err, '<<< error afterAll');
    }
})

describe('POST /orders/book', () => {
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
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully create new hotel')
    })

    it('success fetch hotels 200', async () => {
        const response = await request(app)
            .get(`/hotels`)
            .set({ access_token, Accept: "application/json" })
        hotelRoomId = response.body.data[0].HotelRoom[0].id
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
    })

    it('success book 201', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body.data).toHaveProperty('message')
        // expect(response.body.data).toHaveProperty('paypal')
        expect(response.body.data).toHaveProperty('order')
        expect(response.body.data.message).toEqual('Successfully create new order')
    }, 20000)

    it('failed book 400 : empty hotelRoomId', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: '',
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Hotel Room Id is required')
    })

    it('failed book 400 : empty totalPrice', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Total Price is required')
    })

    it('failed book 400 : empty checkin', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('CheckInAt is required')
    })

    it('failed book 400 : empty CheckOutAt', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('CheckOutAt is required')
    })

    it('failed book 400 : empty Customer Name', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: '',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Customer Name is required')
    })

    it('failed book 400 : empty Customer email', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: '',
                customerPhoneNumber: '0812334423'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Customer Email is required')
    })

    it('failed book 400 : empty Customer phone', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: ''
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Customer Phone Number is required')
    })

    it('failed book 401', async () => {
        const response = await request(app)
            .post('/orders/book')
            .send({
                hotelRoomId: hotelRoomId,
                totalPrice: 845500,
                checkInAt: '2023-06-25T11:35:19.872Z',
                checkOutAt: '2023-06-29T11:35:19.872Z',
                customerName: 'Budi',
                customerEmail: 'budi@gmail.com',
                customerPhoneNumber: '0812334423'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

// describe('POST capture payment', () => {
//     it('failed book 500', async () => {
//         const response = await request(app)
//             .post(`/orders/book/success?token=${paypalId}`)
//             .set({ access_token, Accept: "application/json" })
//         expect(response.status).toEqual(500)
//         expect(response.body).toHaveProperty('statusCode')
//         expect(response.body).toHaveProperty('error')
//         expect(response.body.error).toHaveProperty('message')
//         expect(response.body.error.message).toEqual('Internal Server Error')
//     }, 10000)
// })

// describe('TEST FCM', () => {
//     it('send firebase', async () => {
//         const response = await orderController.sendFirebase(userId, 'Test', 'test')
//         expect(response).toMatch(new RegExp('projects/heal-space/messages'))
//     }, 10000)
// })

// describe('TEST Paypal', () => {
//     it('get paypal token', async () => {
//         const response = await orderController.generatePaypalToken()
//         expect(response).toBeTruthy()
//     }, 50000)
// })

describe('GET /orders', () => {
    it('success fetch 200', async () => {
        const response = await request(app)
            .get('/orders')
            .set({ access_token, Accept: "application/json" })
        orderId = response.body.data[0].id
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0].status).toEqual('Pending')
    })

    it('failed fetch 404', async () => {
        const response = await request(app)
            .get('/orders')
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('GET /orders/:id', () => {
    it('success fetch 200', async () => {
        const response = await request(app)
            .get(`/orders/${orderId}`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.status).toEqual('Pending')
    })

    it('failed fetch 401', async () => {
        const response = await request(app)
            .get(`/orders/${orderId}`)
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })

    it('failed fetch 404', async () => {
        const response = await request(app)
            .get(`/orders/121231`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Data not found')
    })
})

describe('PUT /orders/status/:id', () => {
    it('success update status success 200', async () => {
        const response = await request(app)
            .put(`/orders/status/${orderId}`)
            .send({
                status: 'Success'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully update order status')
    })

    it('failed update 400', async () => {
        const response = await request(app)
            .put(`/orders/status/${orderId}`)
            .send({
                status: ''
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Status is required')
    })

    it('failed update 401', async () => {
        const response = await request(app)
            .put(`/orders/status/${orderId}`)
            .send({
                status: 'Success'
            })
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })

    it('failed update 404', async () => {
        const response = await request(app)
            .put(`/orders/status/12334`)
            .send({
                status: 'Success'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Data not found')
    })
})