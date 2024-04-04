import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const senderMailId = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const teamMail = process.env.MAIL_TECH_ID;

// PRANAV SIR AND RITIK SIR
// let cc = ["500086202@stu.upes.ac.in", "500083016@stu.upes.ac.in"];
// let cc = "500086202@stu.upes.ac.in"
// ------------------------------------------------------------------------------

/* MAIL TEMPLATES IMPORTING */

import { MAILTEMPLATES } from "./messages/mails.js";

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
      // cc: cc,
      // bcc: [email, teamMail],
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
