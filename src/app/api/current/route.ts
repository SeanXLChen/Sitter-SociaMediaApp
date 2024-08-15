import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    try {
        // Use getServerSession instead of getSession
        const session = await getServerSession({ req });

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not signed in" }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!currentUser) {
            return NextResponse.json({ error: "Not signed in" }, { status: 401 });
        }

        return NextResponse.json({ currentUser });
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 400 });
    }
}