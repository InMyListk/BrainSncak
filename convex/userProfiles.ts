import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("userProfiles").collect();
    },
});


export const getUserProfile = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const profile = await ctx.db
            .query("userProfiles")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first(); // .first() returns the first match or null
        return profile;
    },
});

export const updateUserProfile = mutation({
    args: {
        email: v.string(),
        name: v.string(),
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
        const { email, ...updateData } = args;
        const profile = await ctx.db
            .query("userProfiles")
            .filter((q) => q.eq(q.field("email"), email))
            .first();

        if (!profile) {
            throw new Error("User profile not found");
        }

        await ctx.db.patch(profile._id, updateData);
        return { success: true };
    }
});