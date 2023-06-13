import paystack from "@/lib/paystack";
import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
const { initializePayment } = paystack();

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const form = {
      email: body.email,
      amount: 500 * 100,
    };
    
    form.metadata = {
      full_name: body.fullname,
      phone: body.phone,
      institutions: body.institutions
    };
    const response = await initializePayment(form);

    return new Response(
      JSON.stringify({ url: response?.data?.authorization_url }),
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
