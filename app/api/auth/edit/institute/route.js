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

    const resource = await user.findOne({
      "institutions._id": requestObj.id,
    });

    checkPermissions(payload.userId, resource?._id);

    const updatedUser = await user.findOneAndUpdate(
      { "institutions._id": requestObj.id },
      {
        $set: {
          "institutions.$.state": requestObj.state,
          "institutions.$.institution": requestObj.value,
        },
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
