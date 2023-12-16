const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    getAll: async () => { 
        let result = await prisma.users.findMany()
        return result
    },
    getOne: async (u_id) => {

        let result = await prisma.users.findUnique({
            where: { u_id: u_id },
        })

        return result
    },
    getByEmail: async (u_email) => {
        
        let result = await prisma.users.findUnique({
            where: { u_email: String(u_email) },
        })

        return result
    },
    search: async (query, u_id) => {
        
        let result = await prisma.users.findMany({
            where: {
                NOT: {
                    u_id: u_id,
                },
                OR: [
                    {
                        u_email: { contains: query }
                    },
                    {
                        u_name: { contains: query }
                    },
                    {
                        u_last_name: { contains: query }
                    }
                ]
            }
        })

        return result
    },
    create: async (u_name, u_last_name, u_email, u_password) => {
        const result = await prisma.users.create({
            data: {
                u_name,
                u_last_name,
                u_email, 
                u_password
              },
        })

        return result
    },
    update:  async (u_name, u_last_name, u_email, u_id) => {

        const result = await prisma.users.update({
            where: { u_id: u_id },
            data: {
                u_name,
                u_last_name,
                u_email, 
            },
        })

        return result
    },
    delete: async (u_id) => {
        let result = await prisma.users.delete({
            where: { u_id: u_id },
        })

        return result
    },
}