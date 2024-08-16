import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

const serverAuth = async (req: Request) => {
  // 仅传递 authOptions
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in - email not found");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in - user not found");
  }

  return currentUser;
};

export default serverAuth;