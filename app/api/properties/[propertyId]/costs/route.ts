import { NextRequest, NextResponse } from "next/server";
import { OK, UNAUTHORIZED } from "@/constants/httpStatus";
import connect from "@/config/db";
import { decodeToken } from "@/utils/jwt";
import Cost from "@/models/cost";

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

    const costs = await Cost.find({property:propertyId, user:verified.userId});

    return NextResponse.json({costs}, { status: OK });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest, {params}:ParamsProps) {
  
  const { date, amount, tp } = await request.json();

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  
  try {
    await connect();
    const newCost = new Cost({ amount, tp,  date, property: params.propertyId, user:verified.userId });
  
    await newCost.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
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
    const { date, amount, tp, _id } = await request.json();
    const updateCost = await Cost.findOne({ _id });
    updateCost.date = date;
    updateCost.amount = amount;
    updateCost.tp = tp;

    await updateCost.save();
    return NextResponse.json({ msg: "updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();

    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    await Cost.deleteOne({ _id, user: verified.userId });
    return NextResponse.json({ msg: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}