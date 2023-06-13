import { StatusCodes } from "http-status-codes";
import { connectToDB } from "@/utils/connect";
import user from "@/model/user";
import auth from "@/middlewares/auth";

export const GET = async (req) => {
  try {
    await connectToDB();

    const payload = await auth();

    const user = await user.find({ _id: payload.userId });

    return new Response(JSON.stringify(user), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
