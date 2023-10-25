import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// db connect
connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        console.log();

        // check if user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }
        // hash the password
        const salt = await bcryptjs.genSalt(10); // generate salt
        const hashedPassword = await bcryptjs.hash(password, salt); // hash password

        // save password to database
        const savedUser = await new User({ username, email, password: hashedPassword }).save();

        console.log("savedUser", savedUser);

        // return response
        return NextResponse.json({ message: "User created successfully", success: true, savedUser })
        //

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}