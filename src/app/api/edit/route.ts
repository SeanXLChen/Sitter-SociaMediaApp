import prisma from "@/app/libs/prismadb";
import serverAuth from "@/app/libs/serverAuth";

export async function PATCH(req: Request) {
  try {
    const currentUser = await serverAuth(req);

    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return new Response(JSON.stringify(updateUser), { status: 200 });

  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 400 });
  }
}
