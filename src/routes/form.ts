import { SMTPClient } from "emailjs";

const sender = {
  name: "Estudio Gaplogic",
  email: "estudio@gaplogic.com",
  first_subject: "¡Gracias por contactarnos!",
  first_response: /*html*/`
    <h1>¡Gracias por contactarnos!</h1>
    <p>
      Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.
    </p>
  `,
}

const client = new SMTPClient({
  user: sender.email,
  password: "M@nzan@p0drid4",
  host: "smtp.ionos.es",
  ssl: true
});

export async function post({ request }) {
  const form = await request.json();

  try {
    //toSender
    await client.sendAsync({
      from: `${sender.name} <${sender.email}>`,
      to: `${sender.name} <${sender.email}>`,
      subject: `${form.name} - ${form.email}`,
      text: `${form.message}`,
    });

    //toClient
    await client.sendAsync({
      from: `${sender.name} <${sender.email}>`,
      to: `${form.name} <${form.email}>`,
      cc: `verdu <verdukactus@gmail.com>`,
      subject: `${sender.first_subject}`,
      text: `${sender.first_response}`,
      attachment: [
        { data: `<html>${sender.first_response}</html>`, alternative: true },
      ],
    });

    return {
      body: {
        error: null,
      }
    }
  } catch (error) {
    console.log(error);

    return {
      body: {
        error: error.message
      }
    }
  }

}