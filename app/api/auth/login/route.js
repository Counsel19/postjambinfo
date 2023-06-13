import User from "@/model/user.js";
import { StatusCodes } from "http-status-codes";
import { connectToDB } from "@/utils/connect";

export const POST = async (req) => {
  try {
    await connectToDB();

    let user = null;
    let token = null;

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ msg: "Please Enter all fields" }), {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return new Response(JSON.stringify({ msg: "User not Found" }), {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);
   
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ msg: "Wrong Password!" }), {
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    token = await user.createJWT();
    user.password = undefined;

    return new Response(
      JSON.stringify({
        user,
        token,
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
