import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
import { type NextRequest } from 'next/server'


export async function GET(
  req: NextRequest
) {
  try {
    
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')

    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    }

    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await serverAuth(req);

    const {body} = await req.json(); // parse request body to JSON

    console.log(body);

    // create new post
    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return Response.json(post);

  } catch (error) {

    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error creating post" }), { status: 400 }
    );

  }
}