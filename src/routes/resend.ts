import { SMTPClient } from "emailjs";

const sender = {
  name: "Estudio Gaplogic",
  email: "estudio@gaplogic.com",
}

const client = new SMTPClient({
  user: sender.email,
  password: import.meta.env.VITE_EMAIL_PASS,
  host: "smtp.ionos.es",
  ssl: true
});

export async function get() {
  try {
    await client.sendAsync({
      from: `${sender.name} <${sender.email}>`,
      to: `${sender.name} <${sender.email}>`,
      subject: `Autoenvio`,
      text: `Autoenvio completado`,
    });

    const nite = new Date(1648067356967) // 2022-03-23T20:29:16.967Z;
    const now = new Date();

    if (nite > now) {
      const disable = await fetch(`https://api.github.com/repos/gaplogic/gap-the-funnel/actions/workflows/${id}/disable`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${import.meta.env.VITE_GH_TOKEN}`
        }
      });
    }


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