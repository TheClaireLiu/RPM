import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Property from "@/models/property";
import Room from "@/models/room";
import Tenant from "@/models/tenant";
import Rent from "@/models/rent";
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

}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const { tenantId } = params;

  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }

  try {
    await connect();

    const { name, startDate, endDate, deposit, isCurrent } = await request.json();
    const tenant = await Tenant.findOne({ _id: tenantId });

    await Tenant.updateOne({isCurrent:true, room: tenant.room}, {$set:{isCurrent: false}});

    //update tenant
    tenant.name = name;
    tenant.deposit = deposit;
    tenant.startDate = startDate;
    tenant.endDate = endDate;
    tenant.isCurrent = isCurrent;
    await tenant.save();
    return NextResponse.json({ msg: "updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
