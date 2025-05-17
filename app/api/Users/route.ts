import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/(models)/User";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const userData = body.formData

        if(!userData.email || !userData.password) {
            return NextResponse.json({
                message: "No Credentials, error"
            }, {
                status: 404
            })
        }

        const duplicate = await UserModel.findOne({
            email: userData.email
        }).lean().exec()

        if(duplicate) {
            return NextResponse.json({
                message: "email not unique!"
            })
        }

        const hashedPassword = await bcrypt.hash(userData.password, 5)
        userData.password = hashedPassword

        await UserModel.create(userData)

        return NextResponse.json({
            message: "user created"
        }, {
            status: 201
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "error found at route /Users", error
        }, {
            status: 500
        })
    }
}