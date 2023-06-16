import { StatusCodes } from "http-status-codes";
import paystack from "@/lib/paystack";
import { connectToDB } from "@/utils/connect";
const { verifyPayment } = paystack();

export const GET = async (req) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    const response = await verifyPayment(ref);

    return new Response(JSON.stringify(response), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
