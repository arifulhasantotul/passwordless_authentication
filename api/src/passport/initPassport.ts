import { AuthenticationError } from "apollo-server-express";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import User from "../models/User";
import { loginStrategies, validateEmail } from "../utils/general";

const initPassport = () => {
  passport.use(
    new GraphQLLocalStrategy(
      async (username: any, password: any, done: any) => {
        let matchingUser = null;

        if (validateEmail(username)) {
          const email = username;
          matchingUser = await User.findOne({ email: email });
          if (!matchingUser) {
            const newUser = new User({
              username: email,
              email: email,
              loginStrategy: loginStrategies.LOCAL,
            });

            matchingUser = await newUser.save();
          }
        } else {
          const phone = username;
          matchingUser = await User.findOne({ phone: phone });
          if (!matchingUser) {
            const newUser = new User({
              username: phone,
              phone: phone,
              loginStrategy: loginStrategies.LOCAL,
            });

            matchingUser = await newUser.save();
          }
        }

        const error = matchingUser
          ? null
          : new AuthenticationError("❌ No user matched!");
        done(error, matchingUser);
      }
    )
  );

  passport.serializeUser((user: any, done: any) => {
    console.log("serializing user ➡️  ", user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id: any, done: any) => {
    console.log("deserializing user ➡️  ", id);
    const matchingUser = await User.findById(id);
    done(null, matchingUser);
  });
};

export default initPassport;
