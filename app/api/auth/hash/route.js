import User from "@/model/user.js";
import { StatusCodes } from "http-status-codes";
import { connectToDB } from "@/utils/connect";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    let { password } = await req.json();
    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    return new Response(
      JSON.stringify({
        hash,
      }),
      {
        status: StatusCodes.OK,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
