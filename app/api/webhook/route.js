import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import User from "@/model/user";
import nodemailer from "nodemailer";
import HTML_TEMPLATE from "@/lib/emailTemp";

export const POST = async (req) => {
  try {
    await connectToDB();

    const event = await req.json();

    const {
      reference,
      amount,
      id,
      status,
      customer: { email },
      metadata: { fullname },
      authorization: { card_type, bank },
    } = event.data;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return new Response(JSON.stringify({ msg: "User does not exist" }), {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    foundUser.reference = reference;
    foundUser.transactionId = id;
    foundUser.status = status;
    foundUser.amount = amount;
    foundUser.cardType = card_type;
    foundUser.paymentBank = bank;
    foundUser.hasPaid = true;

    await foundUser.save();

    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "counselokpabijs@gmail.com",
        pass: process.env.GOOGLE_PASS,
      },
      secure: true,
    });

    let mailData = await transporter.sendMail({
      from: "counselokpabijs@gmail.com",
      to: email, // list of receivers
      subject: "Created Successfully ✔", // Subject line
      html: HTML_TEMPLATE(fullname), // html body
    });

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log("Email sent successfully");
    });

    return new Response(JSON.stringify(event), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: error.message || "Something Went Wrong" }),
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
