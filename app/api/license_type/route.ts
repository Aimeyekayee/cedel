import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const licenseTypes = await prisma.license_type.findMany();

    return NextResponse.json(licenseTypes);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
