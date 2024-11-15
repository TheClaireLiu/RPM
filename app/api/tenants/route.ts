import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Tenant from "@/models/tenant";
import connect from "@/config/db";

export async function GET(request: NextRequest) {
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  const userId = verified.userId;
  try {
    await connect();
    const tenants = await Tenant.find({ landlord: userId }).sort({startDate:-1});
    
    return NextResponse.json({ tenants }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
