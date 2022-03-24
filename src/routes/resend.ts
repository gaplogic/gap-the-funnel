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

    const nite = new Date(1648116955509) // 2022-03-24T10:15:55.510Z
    const now = new Date();

    if (nite > now) {
      const req = await fetch(`https://api.github.com/repos/gaplogic/gap-the-funnel/actions/workflows`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${import.meta.env.VITE_GH_TOKEN}`
        }
      });

      const { workflows } = await req.json();
      const { id } = workflows[0];

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