// export const sendMail = async () => {
//   const API_KEY: string = process.env.MAILCHIMP_API_KEY as string;
//   const DATACENTER: string = API_KEY?.split('-')[1];
//   const API_URL: string = `https://${DATACENTER}.api.mailchimp.com/3.0/messages/send`;

//   const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString('base64');
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${base64ApiKey}`,
//   };

//   const message = {
//     html:'<h2>Test</h2>',
//     subject:'Test Subject',
//     from_email:'weisen.li@hotmail.com',
//     to:'weisen.li@hotmail.com'
//   }

//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(message),
//   })

// }

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (options:any) => {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (err) {
    throw err;
  }
}