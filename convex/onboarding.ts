import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveOnboarding = mutation({
    args: {
        email: v.string(),
        preferences: v.array(v.string()),
        snackStyle: v.union(
            v.literal("fun"),
            v.literal("educational"),
            v.literal("question"),
            v.literal("surprise")
        ),
        language: v.string(),
        subscription: v.boolean(),
    },
    handler: async (ctx, args) => {
        const createdAt = Date.now();
        const userDoc = {
            ...args,
            createdAt,
        };
        const _id = await ctx.db.insert("userProfiles", userDoc);
        return { _id };
    },
});
