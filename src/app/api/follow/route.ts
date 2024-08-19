import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const currentUser = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    updatedFollowingIds.push(userId);

    try {
      await prisma.notification.create({
        data: {
          body: "Someone followed you",
          userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.error(error);
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error following/unfollowing user" }), { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const currentUser = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];


    updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error following/unfollowing user" }), { status: 400 });
  }
}
