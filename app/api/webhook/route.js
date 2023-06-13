import { connectToDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import User from "@/model/user";
import nodemailer from "nodemailer"
import HTML_TEMPLATE from "@/lib/emailTemp"

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
      metadata: { full_name, phone, institutions },
      authorization: { card_type, bank },
    } = event.data;
    let payment;

    payment = await User.create({
      reference,
      institutions: JSON.parse(institutions),
      transactionId: id,
      status,
      amount,
      email,
      phone,
      fullname: full_name,
      cardType: card_type,
      paymentBank: bank,
    });

  
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
      to: event.data.customer.email, // list of receivers
      subject: "Created Successfully ✔", // Subject line
      html: HTML_TEMPLATE(event.data.metadata.full_name), // html body
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
