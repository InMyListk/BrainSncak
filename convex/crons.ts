import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily("Send Snacks", { hourUTC: 6, minuteUTC: 0 },
    internal.sendingSnacks.sendSnackEmail,
)

export default crons;