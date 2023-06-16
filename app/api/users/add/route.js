import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import User from "@/model/user";

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { fullname, email, phone, institutions, password } = body;

    const newUser = await User.create({
      institutions: JSON.parse(institutions),
      email,
      phone,
      fullname,
      password,
    });

    const token = await newUser.createJWT();
    newUser.password = undefined;

    return new Response(JSON.stringify({ user: newUser, token }), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
