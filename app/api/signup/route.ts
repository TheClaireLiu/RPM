import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import connect from "@/config/db";
import { sendEmail } from "@/lib/email";

/**
 * @swagger
 * /api/signup:
 *   post:
 *     description: Sign up landlord
 *     responses:
 *       200:
 *         description: Sign up successfully!
 *       400:
 *         description: Email Already Registered
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email.trim()) {
      return NextResponse.json({ err: "Email is required" }, { status: 400 });
    }

    if (!password.trim()) {
      return NextResponse.json({ err: "Password is required" }, { status: 400 });
    }

    await connect();

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      //register
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      existingUser = await newUser.save();
      sendEmail({to:email, subject:'Welcome to Tenant Tracker', html:'<p>Please activte</p>'})
      return NextResponse.json({ msg: "Sign up successfully!" }, { status: 200 });
    } else {

      const response = NextResponse.json(
          {err: "Already Registered"},
          {status: 400},
      );
      // response.cookies.set("token", token, {
      //   httpOnly: true,
      // });
      return response;
    }
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
