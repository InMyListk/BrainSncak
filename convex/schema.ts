import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,

  userProfiles: defineTable({
    email: v.string(),
    preferences: v.array(v.string()),
    snackStyle: v.union(
      v.literal("fun"),
      v.literal("educational"),
      v.literal("question"),
      v.literal("surprise")
    ),
    subscription: v.boolean(),
    language: v.string(),
    createdAt: v.number(),
  }),
});