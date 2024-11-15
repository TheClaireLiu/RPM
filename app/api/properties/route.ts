import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import Property from "@/models/property";
import { decodeToken } from "@/utils/jwt";
import connect from "@/config/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyObject:
 *       type: object
 *       properies:
 *         ObjectId:
 *           type: string
 *           description: Property id
 *           example: 5f8f9f8f8f8f8f8f8f8f8f8f8
 *         name:
 *           type: string
 *           description: Property name
 *           example: My House
 *         user:
 *           type: string
 *           description: Property user
 *           example: 5f8f9f8f8f8f8f8f8f8f8f
 *
 * tags:
 *  - name: Property
 *    description: A sample of API Group
 *
 * /api/properties:
 *   get:
 *     description: Get Landlord's properties
 *     tags: [Property]
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *         description: Get an object of properties
 *       401:
 *         description: Not Login
 */
export async function GET(request: NextRequest) {
  try {
    const verified = decodeToken(request);

    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    const properties = await Property.find({ user: verified.userId });
    return NextResponse.json({ properties }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    const { name } = await request.json();
    if (!name?.trim()) {
      return NextResponse.json(
        { err: "Property name is required" },
        { status: 400 },
      );
    }

    await connect();

    const newProperty = new Property({ name, user: verified.userId });
    await newProperty.save();
    return NextResponse.json({ msg: "added" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { name, _id } = await request.json();

    const verified = decodeToken(request);
    if (!verified) {
      return NextResponse.json({ err: "Not Login" }, { status: 401 });
    }

    await connect();

    await Property.updateOne({ _id }, { name, user: verified.userId });
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

    await Property.deleteOne({ _id, user: verified.userId });
    return NextResponse.json({ msg: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
