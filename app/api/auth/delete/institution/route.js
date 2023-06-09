import { StatusCodes } from "http-status-codes";
import { connectToDB } from "@/utils/connect";
import user from "@/model/user";
import auth from "@/middlewares/auth";
import checkPermissions from "@/middlewares/checkPermission";

export const DELETE = async (req) => {
  try {
    await connectToDB();

    const payload = await auth();

    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get("institutionId");

    const resource = await user.findOne({
      "institutions._id": institutionId,
    });

    checkPermissions(payload.userId, resource?._id);

    await user.findOneAndUpdate(
      {
        "institutions._id": institutionId,
      },
      {
        $pull: {
          institutions: {
            _id: institutionId,
          },
        },
      }
    );

    return new Response(
      JSON.stringify({ msg: "Institution Deleted Successfully" }),
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
