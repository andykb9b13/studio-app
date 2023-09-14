// const router = express.Router();
// const nodemailer = require("nodemailer");

// // Define your email sending logic
// router.post("/sendEmail", async (req, res) => {
//   const { recipient, practicePlan } = req.body;

//   // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: "YourEmailService",
//     auth: {
//       user: "your@email.com",
//       pass: "your_password",
//     },
//   });

//   // Create email data
//   const mailOptions = {
//     from: "your@email.com",
//     to: recipient,
//     subject: "Practice Plan",
//     html: `<p>Your customized practice plan:</p><pre>${JSON.stringify(
//       practicePlan,
//       null,
//       2
//     )}</pre>`,
//   };

//   try {
//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: ", info.messageId);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Email sending error:", error);
//     res.status(500).json({ error: "Email sending failed" });
//   }
// });

// module.exports = router;
