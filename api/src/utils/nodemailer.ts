import * as nodemailer from "nodemailer";

const sendEmail = (
  message: any,
  sender: { email: string; password: string }
) => {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender.email,
        pass: sender.password,
      },
    });

    transporter.sendMail(message, (err, info) => {
      err ? rej(err) : res(info);
    });
  });
};

export const sendOTPEmail = ({
  toUser,
  otp,
  sender,
}: {
  toUser: string;
  otp: number;
  sender?: { email: string; password: string };
}) => {
  const message = {
    from: sender?.email || process.env.SENDER_EMAIL,
    to: toUser,
    subject: "Login Otp",
    html: `
    <h3>Hello ${toUser} 😊</h3>
    <p>Please use the following OTP to login</p>
      <br/>
      <h2>${otp}</h2>
      <p>Cheers,</p>
      <p>Your Application Team</p>
      `,
  };
  let mailSender = sender;

  if (!sender) {
    mailSender = {
      email: process.env.SENDER_EMAIL as string,
      password: process.env.SENDER_EMAIL_PASSWORD as string,
    };
  }
  return sendEmail(message, mailSender!);
};
