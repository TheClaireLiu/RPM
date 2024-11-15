// api/sendemail/route.ts

import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/lib/email';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || "");
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_URL = process.env.POSTMARK_SENDER_EMAIL;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Sorry, Email Address is necessary.' }, { status: 400 });
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // if (!EMAIL_URL) {
    //   throw new Error("POSTMARK_SENDER_EMAIL is not defined");
    // }

    // 生成 JWT Token，设置有效期为1小时
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    // 创建邮件内容，使用生成的 token 替换链接中的 your_token_here
    const emailContent = {
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="background-color: #f7fafc; padding: 32px; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">
          <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <p style="color: #4a5568; margin-bottom: 16px;">Hi there,</p>
            <p style="color: #4a5568; margin-bottom: 16px;">
              You have requested to reset your password. To continue, click the button below:
            </p>
            <div style="text-align: center; margin-bottom: 16px;">
              <a href="${process.env.HOST}/resetpassword?token=${token}" style="background-color: #f97316; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 24px; text-decoration: none; display: inline-block;">
                RESET PASSWORD
              </a>
            </div>
            <p style="color: #718096; text-align: center; font-size: 14px; margin-bottom: 16px;">
              If you received this email in error, you can safely ignore this email.
            </p>
            <p style="color: #4a5568;">
              Please do not hesitate to email to 
              <a href="mailto:help@rentalstudio.com" style="color: #3182ce; text-decoration: underline;">
                help@rentalstudio.com
              </a> if you have any questions.
            </p>
            <p style="color: #4a5568; margin-top: 16px;">Thanks,</p>
            <p style="color: #4a5568; margin-top: 16px;">The RentalManagementPlatform Team</p>
          </div>
        </div>
      `,
    };

    try {
      console.log('Sending email with Postmark...');
      sendEmail(emailContent);
      return NextResponse.json({ msg: 'The verification code has been sent to your email' }, { status: 200 });
    } catch (error: any) {
      console.error('Error sending email:', error.message, error.response);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
  }
}
