import Room from "@/models/room";
import Property from "@/models/property";
import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";

interface ParamsProps {
  params: {
    propertyId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  try {
    const { propertyId } = params;
    
    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    const property = await Property.findOne({ _id: propertyId });
    const rooms = await Room.find({ property: propertyId });
    
    return NextResponse.json({ property,rooms }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { propertyId } = params;

  const verified = decodeToken(request);

  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  await connect();

  const { name,tp } = await request.json();
  const newRoom = new Room({ name, tp, property: propertyId });
  await newRoom.save();

  return NextResponse.json({ msg: "added" }, { status: 200 });
}
