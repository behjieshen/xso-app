import prisma from './prisma'

export async function addWhiteList(email) {
    let approved = await checkWhiteList(email)

    if (!approved) {
        approved = await prisma.approvedemail.create({
            data: {
                email
            }
        })
    }

    return approved
}

export async function checkWhiteList(email) {
    let approved = await prisma.approvedemail.findUnique({
        where: {
            email
        }
    })

    return approved
}