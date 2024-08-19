import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await serverAuth(req);

    const { body } = await req.json(); // 从请求体中获取评论内容
    const postId = req.nextUrl.searchParams.get('postId'); // 从查询参数中获取 postId

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    // 创建新的评论
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    // 发送 notification
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone commented on your tweet',
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error creating comment" }), { status: 400 });
  }
}
