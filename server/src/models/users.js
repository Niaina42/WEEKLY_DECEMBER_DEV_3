const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    getAll: async () => { 
        let result = await prisma.users.findMany()
        return result
    },
    getOne: async (id) => {

        let result = await prisma.users.findUnique({
            where: { id: id },
        })

        return result
    },
    getByEmail: async (email) => {
        
        let result = await prisma.users.findUnique({
            where: { email: String(email) },
        })

        return result
    },
    search: async (query, id) => {
        
        let result = await prisma.users.findMany({
            where: {
                NOT: {
                    id: id,
                },
                OR: [
                    {
                        email: { contains: query }
                    },
                    {
                        name: { contains: query }
                    },
                    {
                        last_name: { contains: query }
                    }
                ]
            }
        })

        return result
    },
    create: async (name, last_name, email, password) => {
        const result = await prisma.users.create({
            data: {
                name,
                last_name,
                email, 
                password
              },
        })

        return result
    },
    update:  async (name, last_name, email, id) => {

        const result = await prisma.users.update({
            where: { id: id },
            data: {
                name,
                last_name,
                email, 
            },
        })

        return result
    },
    delete: async (id) => {
        let result = await prisma.users.delete({
            where: { id: id },
        })

        return result
    },
}