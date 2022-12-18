import { Document, Schema } from "mongoose";
export interface OTPSchemaProps extends Document {
    otp: string;
    user?: string;
    medium: string;
    expiresAt: string;
}
export declare const OTPSchema: Schema<OTPSchemaProps, import("mongoose").Model<OTPSchemaProps, any, any>, undefined, {}>;
declare const _default: import("mongoose").Model<any, {}, {}>;
export default _default;
//# sourceMappingURL=OTP.d.ts.map