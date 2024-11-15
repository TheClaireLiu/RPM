import { NextRequest, NextResponse } from "next/server";
import connect from "@/config/db";

export async function GET(request: NextRequest) {
  try {
    await connect();
    return NextResponse.json({msg:'ok'},{status:200});
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
