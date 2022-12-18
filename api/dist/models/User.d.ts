import { Document, Schema } from "mongoose";
export interface UserSchemaProps extends Document {
    username: string;
    email?: string;
    phone?: string;
    loginStrategy: string;
}
export declare const UserSchema: Schema<UserSchemaProps, import("mongoose").Model<UserSchemaProps, any, any>, undefined, {}>;
declare const _default: import("mongoose").Model<any, {}, {}>;
export default _default;
//# sourceMappingURL=User.d.ts.map