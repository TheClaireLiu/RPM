import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Room from "@/models/room";
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
    const room = await Room.findOne({ _id: roomId });
    return NextResponse.json({ room }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const { roomId } = params;
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const {name,tp} = await request.json();
    const room = await Room.findOne({ _id: roomId });
    room.name = name;
    room.tp = tp;
    await room.save();
    return NextResponse.json({ msg: "updated" }, { status: 200});
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
