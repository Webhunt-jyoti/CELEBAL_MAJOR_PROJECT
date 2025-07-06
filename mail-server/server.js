/*
// server.js
const express = require("express");
const cors = require("cors");
const mailgun = require("mailgun-js");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// 🔐 Use your actual API key and domain from Mailgun
const mg = mailgun({
  apiKey: "key",
  domain: "key",
});

app.post("/send-receipt", (req, res) => {
  console.log("Request Body:", req.body);
  const { email, paymentId, total, items, pdfBase64 } = req.body;

  if (!email || !paymentId || !pdfBase64) {
    console.log("Missing fields detected!");
    return res.status(400).json({ error: "Missing required fields." });
  }

  const data = {
    // ✅ Valid FROM email address using your sandbox domain
    from: "Pyara <mailgun sandbox>",
    to: email,
    subject: "🧾 Your Pyara Receipt",
    text: `Thank you for your purchase!\n\nPayment ID: ${paymentId}\nTotal: ₹${total}\n\nPlease find your receipt attached.`,
    attachment: new mg.Attachment({
      data: Buffer.from(pdfBase64.split(",")[1], "base64"),
      filename: `E_Receipt_${paymentId}.pdf`,
      contentType: "application/pdf",
    }),
  };

  mg.messages().send(data, (err, body) => {
    if (err) {
      console.error("❌ Mailgun error:", err);
      return res.status(500).json({ error: "Email send failed" });
    }
    console.log("✅ Email sent successfully:", body);
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
*/



// -----------------------------------------------    using nodemalier      -------------------------------------------------------------

// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// ✅ Replace with your Gmail credentials (securely in production!)
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post("/send-receipt", (req, res) => {
  console.log("Request Body:", req.body);
  const { email, paymentId, total, items, pdfBase64 } = req.body;

  if (!email || !paymentId || !pdfBase64) {
    console.log("Missing fields detected!");
    return res.status(400).json({ error: "Missing required fields." });
  }

  const mailOptions = {
    from: `"Pyara" <process.env.EMAIL_USER>`, // sender
    to: email, // recipient
    subject: "🧾 Your Pyara Receipt",
    text: `Thank you for your purchase!\n\nPayment ID: ${paymentId}\nTotal: ₹${total}\n\nPlease find your receipt attached.`,
    attachments: [
      {
        filename: `E_Receipt_${paymentId}.pdf`,
        content: Buffer.from(pdfBase64.split(",")[1], "base64"),
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Nodemailer error:", err);
      return res.status(500).json({ error: "Email send failed" });
    }
    console.log("✅ Email sent:", info.response);
    res.json({ success: true });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

