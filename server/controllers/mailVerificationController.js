const nodemailer = require("nodemailer");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "your-email-service-provider",
  auth: {
    user: "your-email@example.com",
    pass: "your-email-password",
  },
});

const postEmail = async (req, res) => {
  // Generate a verification token (you can use a library like uuid or crypto)
  const verificationToken = "your-unique-token";

  // Compose the email message
  const mailOptions = {
    from: "your-email@example.com",
    to: req.body.email,
    subject: "Account Verification",
    text: `Click the following link to verify your account: 
   http://your-website.com/verify/${verificationToken}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send verification email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Verification email sent" });
    }
  });
};

module.exports = { postEmail };
