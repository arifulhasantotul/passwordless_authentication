import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import session from "express-session";
import { buildContext } from "graphql-passport";
import mongoose from "mongoose";
import passport from "passport";
import { v4 as uuid } from "uuid";
import { schemaObject } from "./apollo";
import initPassport from "./passport/initPassport";
dotenv.config();

initPassport();
const app: Express = express();

app.use(express.json());
app.use(
  session({
    genid: (req: Request) => uuid() as any,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Initializing apollo server
const apolloServer = new ApolloServer({
  schema: schemaObject,
  context: ({ req, res }: { req: Request; res: Response }) =>
    buildContext({ req, res }),
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

apolloServer.applyMiddleware({ app, cors: false });

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGOS_CONNECTION_STRING as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB...");

    app.listen(port, () => {
      console.log(`🚀 Server running on port`, port);
    });
  })
  .catch((err) => {
    console.log("❌ Failed to connect to MongoDB...", err);
  });

// tutorial 7 done. tutorial 8 running
// important tutorial 8 time 8:00 to 10:09
