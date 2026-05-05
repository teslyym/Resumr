const FREE_LIMITS = {
  aiEnhancementsPerMonth: 5,
  coverLettersPerMonth: 1,
};

/**
 * Resets a user's usage counters when they cross into a new month
 * since their last reset. Persists changes.
 */
async function resetUsageIfNewMonth(user) {
  const now = new Date();
  const reset = user.usage?.resetDate ? new Date(user.usage.resetDate) : null;

  if (
    !reset ||
    reset.getMonth() !== now.getMonth() ||
    reset.getFullYear() !== now.getFullYear()
  ) {
    user.usage.aiEnhancementsThisMonth = 0;
    user.usage.coverLettersThisMonth = 0;
    user.usage.resetDate = now;
    await user.save();
  }
}

/**
 * Throws if the user is over their AI enhancement limit.
 */
async function checkAIEnhancementLimit(user) {
  await resetUsageIfNewMonth(user);

  if (user.plan === "pro") return; // unlimited

  if (
    user.usage.aiEnhancementsThisMonth >= FREE_LIMITS.aiEnhancementsPerMonth
  ) {
    const err = new Error(
      `You've used all ${FREE_LIMITS.aiEnhancementsPerMonth} free enhancements for this month. Upgrade to Pro for unlimited.`,
    );
    err.statusCode = 429;
    throw err;
  }
}

async function incrementAIEnhancementUsage(user) {
  user.usage.aiEnhancementsThisMonth =
    (user.usage.aiEnhancementsThisMonth || 0) + 1;
  await user.save();
}

module.exports = {
  FREE_LIMITS,
  resetUsageIfNewMonth,
  checkAIEnhancementLimit,
  incrementAIEnhancementUsage,
};
