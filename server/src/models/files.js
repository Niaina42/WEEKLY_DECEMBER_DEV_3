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
    create: async (path, name, folder_id) => {
        const result = await prisma.files.create({
            data: {
                path, 
                name,
                folder: {
                    connect: {
                        id: parseInt(folder_id)
                    }
                }
            },
        })

        return result
    },
    delete: async (id) => {
        let result = await prisma.files.delete({
            where: { id: parseInt(id) },
        })

        return result
    },
}