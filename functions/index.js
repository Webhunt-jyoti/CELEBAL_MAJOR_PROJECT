import functions from "firebase-functions";
import mailgun from "mailgun-js";
import corsLib from "cors";

const cors = corsLib({ origin: true });

const mg = mailgun({
  apiKey: functions.config().mailgun.key,
  domain: functions.config().mailgun.domain,
});

export const sendReceiptEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { email, subject, html } = req.body;

    const data = {
      from: "jyotiranjanmahapatra899@gmail.com",
      to: email,
      subject,
      html,
    };

    mg.messages().send(data, (error, body) => {
      if (error) {
        console.error("❌ Mailgun error:", error);
        return res.status(500).send("Failed to send email");
      }
      console.log("✅ Email sent:", body);
      res.status(200).send("Email sent successfully");
    });
  });
});
