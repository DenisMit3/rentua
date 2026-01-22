import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Lazy initialization - клиент создаётся только при первом обращении
function getPrismaClient(): PrismaClient {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        });
    }
    return globalForPrisma.prisma;
}

// Экспортируем getter вместо прямого клиента
export const prisma = new Proxy({} as PrismaClient, {
    get(_, prop) {
        const client = getPrismaClient();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (client as any)[prop];
    },
});

export default prisma;
