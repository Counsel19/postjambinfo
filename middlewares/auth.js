import { StatusCodes } from "http-status-codes";
import { jwtVerify } from "jose";
import { headers } from "next/headers";

const auth = async () => {
  const headersList = headers();
  const authHeader = headersList.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return new Response(JSON.stringify({ msg: "Invalid token" }), {
      status: StatusCodes.UNAUTHORIZED,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload;
  } catch (error) {
    throw error;
  }
};

export default auth;
