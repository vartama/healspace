const prisma = require('../config/prisma')

class User {
    static async findBookmarks(option = {}) {
        try {
            const data = await prisma.bookmark.findMany(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async findBookmark(option = {}) {
        try {
            const data = await prisma.bookmark.findFirst(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async addBookmark(option = {}) {
        try {
            const data = await prisma.bookmark.create(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async deleteBookmark(option = {}) {
        try {
            const data = await prisma.bookmark.delete(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async deleteAllBookmark(option = {}) {
        try {
            const data = await prisma.bookmark.deleteMany(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async findOne(option = {}) {
        try {
            const data = await prisma.user.findUnique(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async create(option = {}) {
        try {
            const data = await prisma.user.create(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async update(option = {}) {
        try {
            const data = await prisma.user.update(option)
            return data
        } catch (err) {
            throw err
        }
    }

    static async deleteAll(option = {}) {
        try {
            const data = await prisma.user.deleteMany(option)
            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = User