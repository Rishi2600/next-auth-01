import UserModel from "@/app/(models)/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"

if(!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    throw new Error("missing credentials from OAuth")
}

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "Email" },
                password: { label: "password", type: "password", placeholder: "Password" }
            },
            //@ts-ignore
            async authorize(credentials) {
                /*here the logic of the authentication will be added to look up for the user from the credentials supplied.*/
                try {
                    console.log(credentials);

                    const foundUser = await UserModel.findOne({email: credentials?.email}).lean().exec()

                    if(foundUser) {
                        //@ts-ignore
                        const match = await bcrypt.compare(credentials?.password, foundUser.password)

                        if(match) {
                            //@ts-ignore
                            delete foundUser.password
                            return foundUser
                        }
                    }
                } catch(e) {
                    console.log(e)
                }
                return null
            }
        }),
        GithubProvider({
            //@ts-ignore
            profile(profile) {
                console.log(profile)

                let userRole = "user";
                if(profile.email === "rishiraj6177@gmail.com") {
                    userRole = "Admin";
                    console.log(userRole);
                }

                return {
                    ...profile,
                    userRole,
                }
            },
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            profile(profile) {
                console.log(profile)

                const id = profile.sub;
                console.log(id)

                return {
                    ...profile,
                    id,
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    /*using callbacks for role based authentication/access control in this particular use-Case, not necessary for normal use-case.*/
    callbacks: {
        /*for the server side.*/
        //@ts-ignore
        async jwt({token, user}) {
            if(user) {
                //@ts-ignore
                token.role = user.role
            }
            return token;
        },
        /*for the client side --
        this is important because you want to pass the role from the JWT token to the session so you can access it in your application.*/
        //@ts-ignore
        async session({token, session}) {
            if(session?.user) {
                token.role = session.user.role as string
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}