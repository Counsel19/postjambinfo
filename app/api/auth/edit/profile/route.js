import { StatusCodes } from "http-status-codes";
import { connectToDB } from "@/utils/connect";
import user from "@/model/user";
import auth from "@/middlewares/auth";
import checkPermissions from "@/middlewares/checkPermission";

export const POST = async (req) => {
  try {
    await connectToDB();

    const payload = await auth();

    const requestObj = await req.json();

    checkPermissions(payload.userId, requestObj?.id);

    const updatedUser = await user.findOneAndUpdate(
      { _id: requestObj?.id },

      {
        fullname: requestObj.fullname,
        email: requestObj.email,
        phone: requestObj.phone,
      },

      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
