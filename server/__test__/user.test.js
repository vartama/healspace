const request = require('supertest')
const app = require('../app')
const user = require('../models/user')
const hotel = require('../models/hotel')
let access_token = ''
let userId = ''
let bookmarkId = ''
let hotelId = ''

afterAll(async () => {
    try {
        await user.deleteAllBookmark({})
        await user.deleteAll({})
        await hotel.deleteAll({})
    } catch (err) {
        console.log(err, '<<< error afterAll');
    }
})

describe('POST /users/register', () => {
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

    it('failed register 400 : empty', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '',
                password: '',
                fullName: '',
                gender: '',
                dateOfBirth: '',
                phoneNumber: ''
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toMatch(new RegExp('is required'))
    })

    it('failed register 400 : empty email', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '',
                password: 'testing',
                fullName: 'Testing',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email is required')
    })

    it('failed register 400 : invalid email', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: 'sdad',
                password: 'testing',
                fullName: 'Testing',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email is invalid')
    })

    it('failed register 400 : empty password', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '123@gmail.com',
                password: '',
                fullName: 'Testing',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Password is required')
    })

    it('failed register 400 : empty fullName', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '123@gmail.com',
                password: '12345',
                fullName: '',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Full Name is required')
    })

    it('failed register 400 : empty gender', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '123@gmail.com',
                password: '12345',
                fullName: '1234',
                gender: '',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Gender is required')
    })
   
    it('failed register 400 : empty dob', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '123@gmail.com',
                password: '12345',
                fullName: '1234',
                gender: 'Male',
                dateOfBirth: '',
                phoneNumber: '0812121'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Date of birth is required')
    })
   
    it('failed register 400 : empty phone', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: '123@gmail.com',
                password: '12345',
                fullName: '1234',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: ''
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Phone Number is required')
    })

    it('failed register 400 : unique email', async () => {
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
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email must be unique')
    })
})

describe('POST /users/login', () => {
    it('failed login 400 : empty email', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: '',
                password: '12345'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email is required')
    })
   
    it('failed login 400 : invalid email', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: '1232.sda',
                password: '1234'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email is invalid')
    })
   
    it('failed login 400 : empty password', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: '1234@dad.com',
                password: ''
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Password is required')
    })

    it('failed login 401', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: '1234@gmail.com',
                password: '1234'
            })
            .set("Accept", "application/json")
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('invalid email or password')
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
})

describe('GET /users', () => {
    it('success fetch 200', async () => {
        const response = await request(app)
            .get('/users')
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
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

    it('failed fetch 401', async () => {
        const response = await request(app)
            .get('/users')
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('PUT /users', () => {
    it('success update 200', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: 'testing@gmail.com',
                password: 'testing',
                fullName: 'Testing Edit',
                gender: 'Female',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully update user data')
    })

    it('failed update 400 : empty email', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '',
                password: 'testing',
                fullName: 'Testing Edit',
                gender: 'Female',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email is required')
    })

    it('failed update 400 : invalid email', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '123.221',
                password: 'testing',
                fullName: 'Testing Edit',
                gender: 'Female',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Email is invalid')
    })

    it('failed update 400 : empty password', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '123@gmail.com',
                password: '',
                fullName: 'Testing Edit',
                gender: 'Female',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Password is required')
    })

    it('failed update 400 : empty full name', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '123@gmail.com',
                password: 'testing',
                fullName: '',
                gender: 'Female',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Full Name is required')
    })

    it('failed update 400 : empty gender', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '123@gmail.com',
                password: 'testing',
                fullName: 'Testing Edit',
                gender: '',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Gender is required')
    })

    it('failed update 400 : empty dob', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '123@gmail.com',
                password: 'testing',
                fullName: 'Testing Edit',
                gender: 'Female',
                dateOfBirth: '',
                phoneNumber: '08111111'
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Date of birth is required')
    })

    it('failed update 400 : empty phone', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: '123@gmail.com',
                password: 'testing',
                fullName: 'Testing Edit',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: ''
            })
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Phone Number is required')
    })

    it('failed update 401', async () => {
        const response = await request(app)
            .put('/users')
            .send({
                email: 'testing@gmail.com',
                password: 'testing',
                fullName: 'Testing Edit 1',
                gender: 'Male',
                dateOfBirth: '2000-06-29T11:35:19.872Z',
                phoneNumber: '08111111'
            })
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('POST /users/bookmarks/:id', () => {
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
                long: "-6.2986375413492555"
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
        hotelId = response.body.data[0].id
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
    })

    it('success add bookmark 201', async () => {
        const response = await request(app)
            .post(`/users/bookmarks/${hotelId}`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully add new bookmark')
    })

    it('failed add bookmark 400', async () => {
        const response = await request(app)
            .post(`/users/bookmarks/${hotelId}`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Already bookmarked')
    })

    it('failed add bookmark 401', async () => {
        const response = await request(app)
            .post(`/users/bookmarks/${hotelId}`)
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('GET /users/bookmarks', () => {
    it('success fetch bookmarks 200', async () => {
        const response = await request(app)
            .get(`/users/bookmarks`)
            .set({ access_token, Accept: "application/json" })
        bookmarkId = response.body.data[0].id
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
    })

    it('success fetch bookmark 200', async () => {
        const response = await request(app)
            .get(`/users/bookmarks/${bookmarkId}`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('UserId')
        expect(response.body.data).toHaveProperty('HotelId')
        expect(response.body.data).toHaveProperty('id')
        expect(response.body.data.id).toEqual(bookmarkId)
        expect(response.body.data.HotelId).toEqual(hotelId)
        expect(response.body.data.UserId).toEqual(userId)
    })

    it('failed fetch bookmarks 401', async () => {
        const response = await request(app)
            .get(`/users/bookmarks`)
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })

    it('failed fetch bookmark 401', async () => {
        const response = await request(app)
            .get(`/users/bookmarks/${bookmarkId}`)
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })
})

describe('DELETE /users/bookmarks', () => {
    it('failed delete bookmark 401', async () => {
        const response = await request(app)
            .delete(`/users/bookmarks/${bookmarkId}`)
            .set({ Accept: "application/json" })
        expect(response.status).toEqual(401)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Error authentication')
    })

    it('failed delete bookmarks 404', async () => {
        const response = await request(app)
            .delete(`/users/bookmarks/12131`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveProperty('message')
        expect(response.body.error.message).toEqual('Data not found')
    })

    it('success delete bookmark 200', async () => {
        const response = await request(app)
            .delete(`/users/bookmarks/${hotelId}`)
            .set({ access_token, Accept: "application/json" })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('statusCode')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('message')
        expect(response.body.data.message).toEqual('Successfully delete bookmark')
    })
})