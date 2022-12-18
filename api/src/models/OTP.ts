import { Document, model, models, Schema } from "mongoose";

export interface OTPSchemaProps extends Document {
  otp: string;
  user?: string;
  medium: string; // phone or email
  expiresAt: string;
}

export const OTPSchema = new Schema<OTPSchemaProps>(
  {
    otp: { type: String, required: true },
    user: { type: String, required: true, unique: true },
    medium: { type: String, required: true },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "5m" },
    },
  },
  {
    timestamps: true,
  }
);

// In case of serverless function to avoid overriding existing schemas
export default models.OTP || model<OTPSchemaProps>("OTP", OTPSchema);
