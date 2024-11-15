import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";
import { sendResponse } from "@/utils/http";

export async function POST(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();
    const {locale} = await request.json();

    const user = await User.findOne({ _id: verified.userId },'email locale roles');

    user.locale = locale;
    await user.save();

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return sendResponse({response:{err},status:500});
  }
}