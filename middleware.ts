import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname)
        //@ts-ignore
        console.log(req.nextauth.token.role)

        //@ts-ignore
        if(req.nextUrl.pathname.startsWith("/Admin") && req.nextauth.token.role != "admin") {
            return NextResponse.rewrite(new URL("/Denied", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({token}) => !!token
        }
    } 
)

export const config = {
    matcher: [
        "/Admin",
    ]
}