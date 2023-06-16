import User from "@/model/user";
import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import auth from "@/middlewares/auth";
import checkPermissions from "@/middlewares/checkPermission";

export const GET = async (req) => {
  try {
    await connectToDB();

    const payload = await auth();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    let user;
    if (userId) {
      checkPermissions(payload.userId, userId);
      user = await User.findById(userId);
    }

    if (!user)
      return new Response(JSON.stringify({ msg: "User Not Found" }), {
        status: StatusCodes.BAD_REQUEST,
      });

    let token = await user.createJWT();
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
