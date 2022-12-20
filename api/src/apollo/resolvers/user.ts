import {
  AuthenticationError,
  IResolvers,
  UserInputError,
} from "apollo-server-express";
import OTP from "../../models/OTP";
import User from "../../models/User";
import { otpGeneratorUtil, validateEmail } from "../../utils/general";

export const userResolvers: IResolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      return context.getUser();
    },
  },
  Mutation: {
    getOtp: async (_, { emailOrPhone }: { emailOrPhone: String }) => {
      if (!emailOrPhone) {
        throw new UserInputError("❌ No email or phone found!");
      }

      const isEmail = validateEmail(emailOrPhone as string);

      const genOtp = otpGeneratorUtil();

      if (isEmail) {
        try {
          const otp = await OTP.findOne({ user: emailOrPhone });
          if (otp) {
            throw new Error("❌ OTP already sent!");
          }

          const newOtp = new OTP({
            user: emailOrPhone,
            otp: genOtp,
            medium: "email",
          });

          // save otp to db
          await newOtp.save();

          // send otp to user email by node mailer

          return `✅ OTP sent to ${emailOrPhone}`;
        } catch (err) {
          console.log("❌ Error sending otp to email: ", err);
          throw new UserInputError("❌ Invalid email!");
        }
      } else {
        let phoneNumber: string;
        try {
          const { value, countryCode }: { value: string; countryCode: string } =
            JSON.parse(emailOrPhone as string);
          phoneNumber = value;

          const otp = await OTP.findOne({ user: phoneNumber });
          if (otp) {
            throw new Error("❌ OTP already sent!");
          }

          const newOtp = new OTP({
            user: phoneNumber,
            otp: genOtp,
            medium: "phone",
          });

          await newOtp.save();

          // send otp to user phone by twilio
          return `✅ OTP sent to ${phoneNumber}`;
        } catch (err) {
          console.log("❌ Error sending otp to phone: ", err);
          throw new UserInputError("❌ Invalid phone!");
        }
      }
    },

    login: async (_, { otp }, context) => {
      try {
        const foundOtp = await OTP.findOne({ otp });
        if (!foundOtp)
          throw new AuthenticationError("❌ Invalid or expired OTP!");

        const { user, info } = await context.authenticate("graphql-local", {
          username: foundOtp?.user,
          password: foundOtp?.user,
        });

        context.login(user);
        return { user };
      } catch (err: any) {
        let errMsg;
        if (err.code == 11000) {
          errMsg = Object.keys(err.keyValue)[0] + " already exists"; // phone already exists
        } else {
          errMsg = err.message;
        }

        throw new Error(errMsg);
      }
    },

    logout: async (_, args, context) => {
      context.logout();
      context.req.session &&
        context.req.session.destroy((err: any) => {
          if (err) {
            console.log("❌ Error logging out: ", err);
            throw new AuthenticationError(err);
          }
        });

      context.req.session = null;
      return `✅ User successfully logged out!`;
    },
    updateProfile: async (_, { id, username, email, phone }, context) => {
      if (!username && !phone && !email) {
        throw new UserInputError(
          "❌ Please update at least one of the 3 fields: username , email or phone"
        );
      }

      try {
        const existingUser = await User.findById(id);

        if (!existingUser) throw new Error("❌ User not found!");

        if (existingUser.username !== username) {
          existingUser.username = username;
        }
        if (existingUser.email !== email) {
          existingUser.email = email;
        }
        if (existingUser.phone !== phone) {
          existingUser.phone = phone;
        }

        await existingUser.save();
        return `user ${id} updated`;
      } catch (err: any) {
        let errMsg;
        if (err.code == 11000) {
          errMsg = Object.keys(err.keyValue)[0] + " already exists"; // phone already exists
        } else {
          errMsg = err.message;
        }

        throw new Error(errMsg);
      }
    },
  },
};
