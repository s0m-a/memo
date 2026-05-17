import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTENDURL}/reset-password?token=${token}`;
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Memo <onboarding@resend.dev>',
      to: email,
      subject: "Reset Your Password - Memo",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg">
          <h2 style="color: #0f172a; margin-bottom: 16px;">Reset Your Password</h2>
          <p style="color: #475569; line-height: 1.6;">You requested to reset your password for your Memo account. Click the button below to set a new password. This link will expire in 1 hour.</p>
          <div style="margin: 32px 0;">
            <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #64748b; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">© ${new Date().getFullYear()} Memo. All rights reserved.</p>
        </div>
      `,
    });
    console.log(`Reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    throw new Error("Failed to send reset email");
  }
};
