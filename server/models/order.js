const prisma = require('../config/prisma')

class Order {
    static async findAll(option = {}) {
        try {
            const data = await prisma.order.findMany(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async findOne(option = {}) {
        try {
            const data = await prisma.order.findFirst(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async create(option = {}) {
        try {
            const data = await prisma.order.create(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async update(option = {}) {
        try {
            const data = await prisma.order.update(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async deleteAll(option = {}) {
        try {
            const data = await prisma.order.deleteMany(option)
            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = Order