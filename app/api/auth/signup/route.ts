import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, username, password, firstname, lastname } = await req.json();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        Firstname: firstname,
        Lastname: lastname,
      },
    });
    return Response.json({
      message: "create user ok",
      data: {
        newUser,
      },
    });
  } catch (error) {
    return Response.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
