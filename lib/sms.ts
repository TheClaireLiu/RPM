import HttpSms from 'httpsms';

const client = new HttpSms(process.env.HTTPSMS_API_KEY||'');

export const sendSMS = async (options:any) => {
  client.messages.postSend({
    encrypted: false,
    content:   options.msg,
    from:      options.from, // Put the correct phone number here
    to:        options.to, // Put the correct phone number here
  })
  .then((message) => {
    console.log(message.id); // log the ID of the sent message
  })
  .catch((err)=>{
    console.error(err);
  })
}


