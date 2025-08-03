import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { RandomReader } from "@oslojs/crypto/random";
// import { mutation } from "./_generated/server";
// import { v } from "convex/values";
// import { resend } from "./myFunctions";

export const ResendOTP = Resend({
  id: "resend-otp",
  apiKey: process.env.RESEND_API_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "BrainSnack <BrainSnack@brainsnack.space>",
      to: [email],
      subject: `🔐 Verify Your Email to Get Started with BrainSnack`,

      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #4F46E5;">Welcome to BrainSnack 🧠</h2>
            <p style="font-size: 16px; color: #333;">
              Hey there! 👋<br/><br/>
              To start receiving your personalized daily brain snacks, please verify your email address.
            </p>
            <div style="margin: 32px 0; text-align: center;">
              <p style="font-size: 18px; font-weight: bold; letter-spacing: 2px; color: #111;">Your OTP Code:</p>
              <p style="font-size: 32px; font-weight: bold; color: #4F46E5;">${token}</p>
            </div>
            <p style="font-size: 14px; color: #555;">
              This code will expire in 10 minutes. If you didn’t request this, just ignore this email.
            </p>
            <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999; text-align: center;">
              BrainSnack · Fuel Your Curiosity
            </p>
          </div>
        `,
    });

    if (error) {
      throw new Error(`Could not send ${error}`);
    }
  },
});

export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };

    const alphabet = "0123456789";
    const length = 8;
    return generateRandomString(length, alphabet);
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "BrainSnack <BrainSnack@brainsnack.space>",
      to: [email],
      subject: "Reset your password in My App",
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px; background: #fff;">
      <h2 style="color: #6b46c1; text-align: center;">Reset your password</h2>
      <p>Hello,</p>
      <p>You recently requested to reset your password for <strong>BrainSnack</strong>. Use the verification code below to complete the process. This code is valid for the next 10 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #111; background: #f3f3f3; padding: 15px 25px; border-radius: 6px; letter-spacing: 4px;">
          ${token}
        </span>
      </div>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
      <p>Thanks,<br/>BrainSnack</p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">
        You’re receiving this email because you signed up for My App.<br/>
        If this wasn’t you, please disregard this message.
      </p>
    </div>
  `,
    });


    if (error) {
      throw new Error("Could not send");
    }
  },
});