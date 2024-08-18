import prisma from '@/app/libs/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { postId: string } },
  response: Response
) {
  try {
    const { postId } = params;
    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return Response.json(post);

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