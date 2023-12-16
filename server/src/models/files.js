const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    getAll: async () => { 
        let result = await prisma.files.findMany()
        return result
    },
    getByFolder: async (folder_id) => { 
        let result = await prisma.files.findMany(
            {
                where:  {
                    folder: {
                       id: parseInt(folder_id)
                    }
                }
            }
        )
        return result
    },
    create: async (path, folder_id) => {
        const result = await prisma.files.create({
            data: {
                path, 
                folder: {
                    connect: {
                        id: parseInt(folder_id)
                    }
                }
            },
        })

        return result
    },
}