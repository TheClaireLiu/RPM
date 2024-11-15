import { NextRequest, NextResponse } from "next/server";
import { OK, UNAUTHORIZED } from "@/constants/httpStatus";
import connect from "@/config/db";
import { decodeToken } from "@/utils/jwt";
import Property from "@/models/property";
import {getStats} from "@/services/stats";

interface ParamsProps {
  params: {
    propertyId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: UNAUTHORIZED });
  }
  try {
    await connect();
    const date = request.nextUrl.searchParams.get("date") ||'';
    const stats = await getStats({ date, propertyId });

    return NextResponse.json(stats, { status: OK });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const { name, ptype } = await request.json();
    const property = await Property.findOne({ _id: propertyId });
    property.name = name;
    property.ptype = ptype;
    await property.save();
    return NextResponse.json({ msg: "updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
