import { PrismaClient } from '@prisma/client';
let prisma;
// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
}
else {
    if (!prisma) {
        prisma = new PrismaClient();
    }
}
export default prisma;

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export default prisma;