"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameworkResolvers = void 0;
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
exports.frameworkResolvers = {
    Query: {
        listFrameworks: (_, args, context) => frameworks,
    },
};
