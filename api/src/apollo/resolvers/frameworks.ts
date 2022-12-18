import { IResolvers } from "apollo-server-express";

const frameworks = [
  {
    _id: Math.random().toString(),
    name: "React",
    url: "https://reactjs.org/",
  },
  {
    _id: Math.random().toString(),
    name: "Angular",
    url: "https://angular.io/",
  },
  {
    _id: Math.random().toString(),
    name: "Vue",
    url: "https://vuejs.org/",
  },
];

export const frameworkResolvers: IResolvers = {
  Query: {
    listFrameworks: (_, args, context) => frameworks,
  },
};
