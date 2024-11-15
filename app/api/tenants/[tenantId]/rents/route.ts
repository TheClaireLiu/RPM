import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
import { RENT_STATUS } from "@/types/rent";
import connect from "@/config/db";

interface ParamsProps {
  params: {
    tenantId: string;
  };
}

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const { tenantId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    let rents = [];
    const rentsResult = await Rent.find({ tenant: tenantId }).sort({
      startDate: -1,
    });

    rents = rentsResult.map((rent) => {
      return {
        _id:rent._id,
        amount:rent.amount,
        startDate:rent.startDate,
        status:rent.status,
        statusTxt:RENT_STATUS[rent.status] || rent.status
      }
    });

    const tenant = await Tenant.findOne({ _id: tenantId });
    const room = await Room.findOne({ _id: tenant.room });
    const property = await Property.findOne({ _id: room.property });
    return NextResponse.json(
      { tenant, rents, room, property },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: ParamsProps) {
  const { tenantId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();
    const { amount, startDate, status } = await request.json();
    const tenant = await Tenant.findOne({ _id: tenantId });
    const newRent = new Rent({
      amount,
      startDate,
      status,
      tenant: tenantId,
      room: tenant.room,
    });
    await newRent.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
