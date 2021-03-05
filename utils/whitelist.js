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

export async function removeWhiteList(email) {
    let exists = await checkWhiteList(email)
    let remove;
    if (exists) {
        remove = await prisma.approvedEmail.delete({
            where: {
                email
            }
        })
    }

    return remove
}

export async function checkWhiteList(email) {
    let approved = await prisma.approvedEmail.findUnique({
        where: {
            email
        }
    })

    return approved
}

export async function getWhiteList() {
    let list = await prisma.approvedEmail.findMany()

    return list
}