import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const licenseTypes = await prisma.license_data.findMany({
      where: { user_uuid: params.id },
    });

    return NextResponse.json(licenseTypes);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
