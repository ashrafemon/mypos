import LoginController from "@/backend/controllers/auth/LoginController";
import { LoginType } from "@/backend/types/authTypes";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const user = await prisma.user.findFirst({
            where: { email: body.email },
        });
        if (!user) {
            return NextResponse.json(
                {
                    status: "error",
                    statusCode: 404,
                    message: "Sorry, User not found...",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: user });
    } catch (err) {
        return NextResponse.json({ err: err?.message }, { status: 500 });
    }
}
