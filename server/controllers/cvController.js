const CV = require("../models/CV");
const { enhanceCV } = require("../services/aiService");

const {
  checkAIEnhancementLimit,
  incrementAIEnhancementUsage,
  FREE_LIMITS,
} = require("../utils/usageLimits");
const createCV = async (req, res) => {
  try {
    const cv = await CV.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(cv);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    console.error("Create CV error:", err);
    res.status(500).json({ message: "Server error creating CV" });
  }
};

const getMyCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select("versionName targetJobTitle template updatedAt createdAt");
    res.status(200).json(cvs);
  } catch (err) {
    console.error("Get my CVs error:", err);
    res.status(500).json({ message: "Server error fetching CVs" });
  }
};

const getCVById = async (req, res) => {
  try {
    const cv = await CV.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json(cv);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "CV not found" });
    }
    console.error("Get CV error:", err);
    res.status(500).json({ message: "Server error fetching CV" });
  }
};

const updateCV = async (req, res) => {
  try {
    const { user, _id, createdAt, updatedAt, ...updates } = req.body;

    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true },
    );

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json(cv);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "CV not found" });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    console.error("Update CV error:", err);
    res.status(500).json({ message: "Server error updating CV" });
  }
};

const deleteCV = async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({ message: "CV deleted", id: cv._id });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "CV not found" });
    }
    console.error("Delete CV error:", err);
    res.status(500).json({ message: "Server error deleting CV" });
  }
};
/**
 * POST /api/cv/:id/enhance
 * Enhances summary + experience bullets using Claude AI.
 * Saves enhanced fields onto the CV. Increments usage counter.
 */
const enhanceCVById = async (req, res) => {
  try {
    // 1. Check usage limit BEFORE making the (paid) AI call
    await checkAIEnhancementLimit(req.user);

    // 2. Load the CV (and verify ownership)
    const cv = await CV.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // 3. Make sure there's something to enhance
    const hasSummary = cv.summary && cv.summary.trim().length > 0;
    const hasBullets =
      cv.experience?.some((e) =>
        e.responsibilities?.some((r) => r.trim().length > 0),
      ) || false;
    if (!hasSummary && !hasBullets) {
      return res.status(400).json({
        message:
          "Add a summary or at least one experience bullet before enhancing.",
      });
    }

    // 4. Call Claude
    const result = await enhanceCV(cv.toObject());

    if (result.enhancedSummary) {
      cv.enhancedSummary = result.enhancedSummary;
    }
    if (Array.isArray(result.enhancedExperience)) {
      result.enhancedExperience.forEach(
        ({ index, enhancedResponsibilities }) => {
          if (cv.experience[index] && Array.isArray(enhancedResponsibilities)) {
            cv.experience[index].enhancedResponsibilities =
              enhancedResponsibilities;
          }
        },
      );
    }
    await cv.save();

    // 6. Increment usage counter (only after success)
    await incrementAIEnhancementUsage(req.user);

    res.status(200).json({
      cv,
      usage: {
        used: req.user.usage.aiEnhancementsThisMonth,
        limit:
          req.user.plan === "pro" ? null : FREE_LIMITS.aiEnhancementsPerMonth,
      },
    });
  } catch (err) {
    if (err.statusCode === 429) {
      return res.status(429).json({ message: err.message });
    }
    console.error("Enhance CV error:", err);
    res.status(500).json({
      message: err.message || "Failed to enhance CV. Please try again.",
    });
  }
};

module.exports = {
  createCV,
  getMyCVs,
  getCVById,
  updateCV,
  deleteCV,
  enhanceCVById,
};
