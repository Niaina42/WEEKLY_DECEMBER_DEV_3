const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    getAll: async () => { 
        let result = await prisma.folders.findMany()
        return result
    },
    getOne:  async (folder_id) => { 
        let result = await prisma.folders.findMany(
            {
                where:  {
                    id: parseInt(folder_id)
                },
                include: {
                    files: true
                }
            }
        )
        return result
    },
    getByUser: async (uid) => { 
        let result = await prisma.folders.findMany(
            {
                where:  {
                    user: {
                       id: parseInt(uid)
                    }
                }
            }
        )
        return result
    },
    create: async (name, uid) => {
        const result = await prisma.folders.create({
            data: {
                name, 
                user: {
                    connect: {
                        id: parseInt(uid)
                    }
                }
            },
        })

        return result
    },
}