import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Tenant from "@/models/tenant";
import Room from "@/models/room";
import Property from "@/models/property";
import connect from "@/config/db";

interface ParamsProps {
  params: {
    roomId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { roomId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const tenants = await Tenant.find({ room: roomId }).sort({ startDate: -1 });
    const room = await Room.findOne({ _id: roomId });
    const property = await Property.findOne({ _id: room.property });
    return NextResponse.json({ tenants, room, property }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { roomId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const { name, startDate, endDate } = await request.json();
    const newTenant = new Tenant({
      name,
      startDate,
      endDate,
      room: roomId,
      landlord: verified.userId,
    });
    await newTenant.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
