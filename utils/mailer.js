import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const senderMailId = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;

/* MAIL TEMPLATES IMPORTING */

import { MAILTEMPLATES } from "./mails.js";

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user: senderMailId,
    pass: password,
  },
  secure: true,
});

function sendMail(username, email, template) {
  try {
    const mailTemplate = MAILTEMPLATES[template];
    const mailSubject = mailTemplate.subject;
    let mailHtml = mailTemplate.html;
    mailHtml = mailHtml.replace("username", username);
    // const attachments = mailTemplate.attachments;

    const mailOptions = {
      from: senderMailId,
      to: email,
      subject: mailSubject,
      html: mailHtml,
      // attachments: [
      //   {
      //     filename: attachments.filename,
      //     path: attachments.path,
      //   },
      // ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.accepted + " Sent");
      }
    });
  } catch (err) {
    console.log("Error in sending mail: " + err);
  }
}

export { sendMail as SENDMAIL };
