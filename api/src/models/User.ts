import { Document, model, models, Schema } from "mongoose";

export interface UserSchemaProps extends Document {
  username: string;
  email?: string;
  phone?: string;
  loginStrategy: string;
}

export const UserSchema = new Schema<UserSchemaProps>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: false,
      index: true,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: false,
      index: true,
      unique: true,
      sparse: true,
    },
    loginStrategy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// In case of serverless function to avoid overriding existing schemas
export default models.User || model<UserSchemaProps>("User", UserSchema);
