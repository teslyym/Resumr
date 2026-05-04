const CV = require("../models/CV");

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

module.exports = {
  createCV,
  getMyCVs,
  getCVById,
  updateCV,
  deleteCV,
};
