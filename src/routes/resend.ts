import { SMTPClient } from "emailjs";

const sender = {
  name: "Estudio Gaplogic",
  email: "estudio@gaplogic.com",
}

const client = new SMTPClient({
  user: sender.email,
  password: "M@nzan@p0drid4",
  host: "smtp.ionos.es",
  ssl: true
});

export async function get() {
  try {
    //toSender
    await client.sendAsync({
      from: `${sender.name} <${sender.email}>`,
      to: `${sender.name} <${sender.email}>`,
      subject: `Autoenvio`,
      text: `Autoenvio completado`,
    });

    return {
      body: {
        error: null,
      }
    }
  } catch (error) {
    return {
      body: {
        error: error.message
      }
    }
  }

}