import prisma from '@/app/libs/prismadb';

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return new Response(JSON.stringify(users), {
            headers: {
                'content-type': 'application/json'
            },
            status: 200,
        });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            headers: {
                'content-type': 'application/json'
            },
            status: 400,
        });
    }
}