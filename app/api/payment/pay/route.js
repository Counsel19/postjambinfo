import paystack from "@/lib/paystack";
import user from "@/model/user";
import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
const { initializePayment } = paystack();

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const userFound = await user.findOne({ email: body.email });

    if (userFound) {
      if (userFound.hasPaid)
        return new Response(
          JSON.stringify({ msg: "Payment has been made already" }),
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      const form = {
        email: body.email,
        amount: 500 * 100,
      };

      form.metadata = {
        fullname: body.fullname,
      };
      const response = await initializePayment(form);

      return new Response(
        JSON.stringify({ url: response?.data?.authorization_url }),
        { status: StatusCodes.CREATED }
      );
    } else {
      return new Response(JSON.stringify({ msg: "User Does not exist" }), {
        status: StatusCodes.BAD_REQUEST,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
