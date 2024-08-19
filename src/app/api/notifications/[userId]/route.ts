import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
  res: Response) {
  try {
    // 从请求的查询参数中获取 userId
    const userId = params.userId;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    // 查找与该用户关联的所有通知
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 更新用户的 hasNotification 字段
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    // 返回通知信息
    return NextResponse.json(notifications, { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error fetching notifications" }), { status: 400 });
  }
}