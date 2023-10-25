import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(req: NextRequest) {

    try {

        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log("reqBody", reqBody);
        // check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist!" }, { status: 400 })
        }
        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Password is incorrect!" }, { status: 400 })
        }

        // create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: process.env.TOKEN_EXPIRES_IN })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        // set cookies 
        response.cookies.set("token", token, { httpOnly: true, path: "/" })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }

}