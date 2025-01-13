import NextAuth from "next-auth";
import {options} from "./options"

const handler = NextAuth(options)

export const POST = handler;
export const GET = handler;
/*can also be written as: export {handler as POST, handler as GET}*/

/* JavaScript DO NOT complain but TypeScript DOES so yeah everything needs to be fulfilled in this case */