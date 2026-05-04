const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, trim: true },
    company: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    responsibilities: [{ type: String, trim: true }],
    enhancedResponsibilities: [{ type: String, trim: true }],
  },
  { _id: true },
);

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, trim: true },
    school: { type: String, trim: true },
    year: { type: String, trim: true },
  },
  { _id: true },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
  },
  { _id: true },
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    issuer: { type: String, trim: true },
    date: { type: String, trim: true },
    credentialId: { type: String, trim: true },
  },
  { _id: true },
);

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    versionName: {
      type: String,
      trim: true,
      default: "Untitled CV",
    },
    template: {
      type: String,
      default: "modern",
    },

    targetJobTitle: { type: String, trim: true },
    jobDescription: { type: String, trim: true },

    personalInfo: {
      fullName: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      location: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      portfolio: { type: String, trim: true },
    },

    summary: { type: String, trim: true },
    enhancedSummary: { type: String, trim: true },

    skills: [{ type: String, trim: true }],

    experience: [experienceSchema],
    education: [educationSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],

    coverLetter: { type: String, trim: true },
    atsKeywords: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("CV", cvSchema);
