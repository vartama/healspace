const prisma = require('../config/prisma')

class Hotel {
    static async findAll(option = {}) {
        try {
            const data = await prisma.hotel.findMany(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async findFacilities(option = {}) {
        try {
            const data = await prisma.facility.findMany(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async addFacility(option = {}) {
        try {
            const data = await prisma.facility.create(option)
            return data
        } catch (err) {
            throw err
        }
    }
 
    static async deleteAllFacility(option = {}) {
        try {
            const data = await prisma.facility.deleteMany(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async findOne(option = {}) {
        try {
            const data = await prisma.hotel.findUnique(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async create(option = {}) {
        try {
            const data = await prisma.hotel.create(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async update(option = {}) {
        try {
            const data = await prisma.hotel.update(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async deleteAll(option = {}) {
        try {
            const data = await prisma.hotel.deleteMany(option)
            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = Hotel