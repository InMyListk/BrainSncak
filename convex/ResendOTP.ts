import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { resend } from "./myFunctions";

export const ResendOTP = Resend({
    id: "resend-otp",
    apiKey: process.env.RESEND_API_KEY,
    async generateVerificationToken() {
        return generateRandomString(8, alphabet("0-9"));
    },
    async sendVerificationRequest({ identifier: email, provider, token }) {
        const resend = new ResendAPI(provider.apiKey);
        const { error } = await resend.emails.send({
            from: "BrainSnack <onboarding@resend.dev>",
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


// export const ResendOTP = mutation({
//     args: { email: v.string() },
//     handler: async (ctx, args) => {
//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
//         await ctx.db.insert("otps", { email: args.email, code, expiresAt });
//         // TODO: Send code via email (use an action for this)
//         await resend.sendEmail(ctx, {
//             from: "onboarding@resend.dev",
//             to: args.email,

//             subject: "🔐 Verify Your Email to Get Started with BrainSnack",

//             html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px;">
//             <h2 style="color: #4F46E5;">Welcome to BrainSnack 🧠</h2>
//             <p style="font-size: 16px; color: #333;">
//               Hey there! 👋<br/><br/>
//               To start receiving your personalized daily brain snacks, please verify your email address.
//             </p>
//             <div style="margin: 32px 0; text-align: center;">
//               <p style="font-size: 18px; font-weight: bold; letter-spacing: 2px; color: #111;">Your OTP Code:</p>
//               <p style="font-size: 32px; font-weight: bold; color: #4F46E5;">${code}</p>
//             </div>
//             <p style="font-size: 14px; color: #555;">
//               This code will expire in 10 minutes. If you didn’t request this, just ignore this email.
//             </p>
//             <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
//             <p style="font-size: 12px; color: #999; text-align: center;">
//               BrainSnack · Fuel Your Curiosity
//             </p>
//           </div>
//         `,

//         }).then((e) => {
//             console.log("Email sent successfully")
//         });
//         return null;
//     },
// });