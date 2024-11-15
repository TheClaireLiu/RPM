import Room from "@/models/room";
import Property from "@/models/property";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const properties = await Property.find();
    const rooms = await Room.find({});

    return NextResponse.json({ rooms, properties }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
