import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP, ResendOTPPasswordReset } from "./ResendOTP";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ verify: ResendOTP, reset: ResendOTPPasswordReset })],
});

export const getUserInfo = query(async (ctx) => {
  try {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", userId))
      .first();

    return user ?? null;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return null;
  }
});

export const updateUserInfo = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      const userId = await getAuthUserId(ctx);
      if (!userId) throw new Error("User not authenticated");
      const user = await ctx.db
        .query("users")
        .withIndex("by_id", (q) => q.eq("_id", userId))
        .first();
      if (!user) throw new Error("User not found");
      await ctx.db.patch(user._id, { name });
      return { success: true, message: "User info updated successfully" };
    } catch (error) {
      console.error("Failed to update user info:", error);
      throw new Error("Failed to update user info");
    }
  },
});

