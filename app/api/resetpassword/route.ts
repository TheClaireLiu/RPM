// api/sendemail/resetdata/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../config/db';
import User from '../../../models/user';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
    }

    let decoded;
    try {
      // 验证 token 并检查其有效期
      decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    } catch (error) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // 连接数据库
    await dbConnect();

    // 使用 email 查找用户
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // 使用 bcrypt 对新密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, 10);

    // 更新用户密码，并清空 resetToken
    user.password = hashedPassword;
    user.forgotPasswardToken = undefined;
    user.forgotPasswardTokenExpiry = undefined;

    // 保存用户更新
    await user.save();

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
}
