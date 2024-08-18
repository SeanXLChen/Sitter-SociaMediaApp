import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
import { type NextRequest, NextResponse } from 'next/server';

// 处理点赞逻辑的 POST 方法
export async function POST(req: NextRequest) {
  try {
    // 从请求体中获取 postId
    const { postId } = await req.json();
    const currentUser = await serverAuth(req);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    // 查找要点赞的帖子
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    // 更新点赞列表
    let updatedLikedIds = [...(post.likedIds || [])];

    // 如果 POST 方法被调用，意味着用户点赞该帖子
    updatedLikedIds.push(currentUser.id);

    // 更新帖子记录
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error liking post" }), { status: 400 });
  }
}

// 处理取消点赞逻辑的 DELETE 方法
export async function DELETE(req: NextRequest) {
  try {
    // 从请求体中获取 postId
    const { postId } = await req.json();
    const currentUser = await serverAuth(req);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    // 查找要取消点赞的帖子
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    // 更新点赞列表
    let updatedLikedIds = [...(post.likedIds || [])];

    // 如果 DELETE 方法被调用，意味着用户取消点赞该帖子
    updatedLikedIds = updatedLikedIds.filter((id) => id !== currentUser.id);

    // 更新帖子记录
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error unliking post" }), { status: 400 });
  }
}
