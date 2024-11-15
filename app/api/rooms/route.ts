import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/jwt";
import Room from "@/models/room";
import Property from "@/models/property";
import connect from "@/config/db";
import Tenant from "@/models/tenant";


export async function GET(request: NextRequest) {
  const verified = decodeToken(request);
  if (!verified) {
    return NextResponse.json({ err: "Not Login" }, { status: 401 });
  }
  try {
    await connect();
    const properties = await Property.find({user: verified.userId});
    const propertyIds = properties.map((property)=>property._id);

    const propertyMap:{[key:string]:any} = {};
    properties.forEach(property => {
      propertyMap[property._id] = property;
    });

    const roomsResult = await Room.find({property:{$in:propertyIds}});
    const roomIds = roomsResult.map(room=>room._id);

    const tenants = await Tenant.find({room:{$in:roomIds}, isCurrent:true});
    const tenantMap:{[key:string]:any} = {};
    tenants.forEach(tenant=>{
      tenantMap[tenant.room] = tenant;
    });


    const rooms = roomsResult.map(({_id,name,tp,property})=> {
      return {
        _id,name,tp,property: propertyMap[property],tenant:tenantMap[_id]
      }
    });
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
