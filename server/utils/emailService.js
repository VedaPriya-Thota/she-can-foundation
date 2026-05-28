const nodemailer = require("nodemailer");

/**
 * Handles sending email notifications to the admin and confirmation emails to the visitor.
 * Gracefully falls back to console logging if SMTP variables are not configured in the environment.
 * 
 * @param {Object} messageData - Object containing name, email, message, and optional timestamps
 * @returns {Promise<boolean>} Resolves to true if operation completed (sent or simulated)
 */
const sendSubmissionEmails = async (messageData) => {
  const { name, email, message } = messageData;
  const submissionTime = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    ADMIN_EMAIL,
  } = process.env;

  // Fallback check - if credentials are missing, log details in terminal instead of throwing
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("\n==================================================");
    console.log("📧 EMAIL SIMULATION FALLBACK (SMTP not configured)");
    console.log("==================================================");
    console.log(`[To Admin]: ${ADMIN_EMAIL || "admin@shecanfoundation.org"}`);
    console.log(`[Subject]: 🔔 New Contact Submission from ${name}`);
    console.log(`[Content]: Visitor named "${name}" (${email}) submitted: "${message}"`);
    console.log("--------------------------------------------------");
    console.log(`[To Visitor]: ${email}`);
    console.log(`[Subject]: Thank you for contacting She Can Foundation`);
    console.log("[Content]: We have received your query and will reply within 24 hours.");
    console.log("==================================================\n");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT) || 587,
      secure: parseInt(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 1. HTML Template for the Admin Alert
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .content { padding: 30px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .info-table td { padding: 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
          .label { font-weight: 600; color: #64748b; width: 120px; font-size: 14px; }
          .val { color: #0f172a; font-size: 14px; }
          .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-top: 10px; font-size: 14px; color: #334155; white-space: pre-line; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Support Query Received</h1>
          </div>
          <div class="content">
            <table class="info-table">
              <tr>
                <td class="label">Visitor Name</td>
                <td class="val">${name}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="val"><a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Submitted At</td>
                <td class="val">${submissionTime}</td>
              </tr>
            </table>
            
            <p style="font-weight: 600; color: #475569; margin: 20px 0 5px 0; font-size: 14px;">Message Details:</p>
            <div class="message-box">${message}</div>
          </div>
          <div class="footer">
            <p>This is an automated system notification from She Can Foundation.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. HTML Template for the Visitor Confirmation
    const visitorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 35px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 26px; font-weight: 700; }
          .content { padding: 35px; }
          .welcome-text { font-size: 16px; color: #0f172a; margin-bottom: 20px; font-weight: 500; }
          .para { font-size: 14px; color: #475569; margin-bottom: 20px; }
          .quote-box { border-left: 4px solid #ec4899; padding-left: 15px; margin: 25px 0; font-style: italic; color: #64748b; font-size: 14px; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 25px; text-align: center; font-size: 12px; color: #64748b; }
          .social-link { color: #8b5cf6; text-decoration: none; font-weight: 600; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>We've Received Your Message</h1>
          </div>
          <div class="content">
            <p class="welcome-text">Dear ${name},</p>
            <p class="para">Thank you for reaching out to the <strong>She Can Foundation</strong>. We believe that empowering women uplifts entire communities, and we are honored that you shared your query with us.</p>
            
            <p class="para">A member of our support team or a designated mentor has received your message and will review it carefully. We strive to respond to all inquiries within <strong>24 to 48 hours</strong>.</p>
            
            <div class="quote-box">
              "Building a stronger future, together. Supporting, mentoring, and empowering women in technology and community initiatives."
            </div>

            <p class="para">If your query is urgent or related to emergency support resources, please check out the contact directory on our landing page for immediate assistance.</p>
            
            <p class="para" style="margin-top: 30px;">With warmth and support,<br><strong>She Can Foundation Support Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 She Can Foundation. All rights reserved.</p>
            <p style="margin-top: 10px;">
              <a href="https://shecanfoundation.org" class="social-link">Website</a> | 
              <a href="https://shecanfoundation.org/mentorship" class="social-link">Mentorship</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch emails concurrently
    await Promise.all([
      transporter.sendMail({
        from: `"She Can Foundation" <${SMTP_USER}>`,
        to: ADMIN_EMAIL || "admin@shecanfoundation.org",
        subject: `🔔 New Contact Submission from ${name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"She Can Foundation" <${SMTP_USER}>`,
        to: email,
        subject: `Thank you for contacting She Can Foundation`,
        html: visitorHtml,
      }),
    ]);

    console.log(`📧 Emails successfully sent to Admin and Visitor (${email}).`);
    return true;
  } catch (error) {
    // Graceful error logging to ensure API request does not fail if SMTP host is temporarily down
    console.error("❌ Email transmission failed, but request continued gracefully:", error.message);
    return false;
  }
};

module.exports = {
  sendSubmissionEmails,
};
