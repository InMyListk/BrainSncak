import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,

  // users: defineTable({
  //   email: v.string(),
  //   preferences: v.array(v.string()),
  //   snackStyle: v.union(
  //     v.literal("fun"),
  //     v.literal("educational"),
  //     v.literal("question"),
  //     v.literal("surprise")
  //   ),
  //   snackSchedule: v.object({
  //     frequency: v.union(
  //       v.literal("daily"),
  //       v.literal("weekdays"),
  //       v.literal("manual")
  //     ),
  //     timeOfDay: v.union(
  //       v.literal("morning"),
  //       v.literal("noon"),
  //       v.literal("evening")
  //     ),
  //   }),
  //   createdAt: v.number(),
  // }),
});