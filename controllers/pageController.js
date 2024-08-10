const nodemailer = require("nodemailer");
const Course = require("../models/Course")
const User = require("../models/User")

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort("-createdAt").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role: "student"});
  const totalTeachers = await User.countDocuments({role: "teacher"});

  res.status(200).render("index", {
    page_name: "index", //! page_name
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {

  try{

  const outputMessage = `
  <h1>Mail Details </h1>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `

  // Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
  if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return process.exit(1);
  }

  console.log('Credentials obtained, sending message...');

  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      }
  });

  // Message object
  let message = {
      from: 'Sender Name <uygulamamaili.js@gmail.com>',
      to: 'Recipient <galaslanonline@gmail.com>',
      subject: 'Nodemailer is unicode friendly ✔',
      html: outputMessage,
  };

  transporter.sendMail(message, (err, info) => {
      if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});

req.flash("success", "We Received Your Message Succesfully!");

res.status(200).redirect("/contact");

  } catch (err) {
    req.flash("error", `Something happened!`);
    res.status(200).redirect("/contact");
  }

};