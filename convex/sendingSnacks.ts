import { internalAction } from "./_generated/server";
import { Resend } from "@convex-dev/resend";
import { api, components } from "./_generated/api";
import generateInformations from "./generateInformations";

const resend = new Resend(components.resend, {
  apiKey: process.env.RESEND_API_KEY || "",
  testMode: false,
});

export const sendSnackEmail = internalAction({
  handler: async (ctx) => {
    const userProfiles = await ctx.runQuery(api.userProfiles.getAll, {});

    for (const profile of userProfiles) {
      const { email, preferences, snackStyle, language, subscription } = profile;

      // Skip if missing required data
      if (!email || !preferences?.length || !snackStyle || !subscription) continue;

      try {
        const randomPreference = preferences[Math.floor(Math.random() * preferences.length)];

        const sessionId = Math.random().toString(36).substring(2, 10); // e.g., 'k3j8vdnq'
        const infoText = await generateInformations(`
                You're an expert content generator who writes engaging, punchy content snippets for users.

                Objective:
                Based on the *selected user preference*, the *preferred content style*, and the *preferred language*, write a unique, short-form content piece.

                User Preference: ${randomPreference}
                Content Style: ${snackStyle}  // Options: fun, educational, question, surprise
                Preferred Language: ${language}
                Session ID: ${sessionId}

                Rules:
                - Write the content in the specified language.
                - Length: 1–3 sentences.
                - Adapt the tone and word choice to match the style.
                - Include a unique angle, fact, question, or hook based on the preference.
                - Make it memorable, original, and free of vague or generic statements.
                - Avoid repeated phrases or previous outputs.

                Respond with only the content.
        `);


        await resend.sendEmail(ctx, {
          from: "BrainSnack <BrainSnack@brainsnack.space>",
          to: email,
          subject: "Your Daily BrainSnack is Here! 🧠",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fefefe; padding: 24px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
              <h2 style="color: #4B0082;">🌟 Today's BrainSnack</h2>
              <p style="font-size: 16px; color: #333;">
                Hey there! Here's a quick knowledge bite tailored to your preferences:
              </p>

              <div style="background: #f0f4ff; padding: 16px; border-left: 4px solid #4B0082; margin: 20px 0; border-radius: 8px;">
                <p style="font-size: 18px; color: #222; font-style: italic;">
                  ${infoText}
                </p>
              </div>

              <p style="font-size: 15px; color: #555;">
                Whether it's science, history, tech, or a little surprise — you'll get a fresh BrainSnack every day.
              </p>

              <hr style="margin: 24px 0;">

              <p style="font-size: 14px; color: #888;">
                You can update your preferences or pause your snacks anytime from your  
                <a href="https://yourapp.com/profile" style="color: #4B0082; text-decoration: none;">profile settings</a>.
              </p>

              <p style="font-size: 13px; color: #aaa; margin-top: 16px;">
                Sent with ❤️ by BrainSnack.
              </p>
            </div>
          `,
        }).catch((error) => {
          console.log(error)
        });

        console.log(`✅ Sent email to ${email}`);
      } catch (error) {
        console.error(`❌ Failed to send email to ${email}:`, error);
      }
    }
  },
});
