import prisma from './prisma'

export async function addWhiteList(email) {
    let approved = await checkWhiteList(email)

    if (!approved) {
        approved = await prisma.approvedEmail.create({
            data: {
                email
            }
        })
    }

    return approved
}

export async function checkWhiteList(email) {
    let approved = await prisma.approvedEmail.findUnique({
        where: {
            email
        }
    })

    return approved
}