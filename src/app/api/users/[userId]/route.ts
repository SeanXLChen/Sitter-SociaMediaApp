import prisma from '@/app/libs/prismadb';

export async function GET(
    request: Request,
    { params }: { params: { userId: string } },
    response: Response
) {
    try {
        const { userId } = params;
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid user ID');
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        });

        return new Response(JSON.stringify({ ...existingUser, followersCount}), {
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