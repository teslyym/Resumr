import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CVDocument from "@/components/cv/CVDocument";
import TemplatePicker from "@/components/cv/TemplatePicker";
import DownloadButton from "@/components/cv/DownloadButton";
//my first comment
// This is Dr Folayo's comment
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import { cvService } from "@/services/cvService";
import { useAutoSave } from "@/lib/useAutoSave";
import { useAuth } from "@/context/AuthContext";
import { CV_FORM_STEPS } from "@/components/cv/cvFormSteps";
import WizardNav from "@/components/cv/WizardNav";
import SaveStatus from "@/components/cv/SaveStatus";
import CVPreview from "@/components/cv/CVPreview";
import UsageIndicator from "@/components/cv/UsageIndicator";
import PersonalInfoSection from "@/components/cv/sections/PersonalInfoSection";
import SummarySection from "@/components/cv/sections/SummarySection";
import SkillsSection from "@/components/cv/sections/SkillsSection";
import ExperienceSection from "@/components/cv/sections/ExperienceSection";
import EducationSection from "@/components/cv/sections/EducationSection";
import ProjectsSection from "@/components/cv/sections/ProjectsSection";
import CertificationsSection from "@/components/cv/sections/CertificationsSection";

export default function CreateCV() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const docRef = useRef(null);

  // AI state
  const [enhancing, setEnhancing] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [usage, setUsage] = useState(null); // { used, limit }

  useEffect(() => {
    if (!id) {
      setCv({});
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetch = async () => {
      try {
        const data = await cvService.getById(id);
        if (!cancelled) {
          setCv(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || "Failed to load CV");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const saveFn = useMemo(() => {
    if (!id) return async () => {};
    return async (data) => {
      await cvService.update(id, data);
    };
  }, [id]);

  const {
    status: saveStatus,
    lastSavedAt,
    save,
  } = useAutoSave(cv, saveFn, {
    enabled: !!cv && !!id,
  });

  const patch = (changes) => setCv((prev) => ({ ...prev, ...changes }));
  const patchPersonal = (newPersonal) =>
    setCv((prev) => ({ ...prev, personalInfo: newPersonal }));

  // === AI handlers ===
  const handleEnhance = async () => {
    if (!id) return;
    setEnhancing(true);
    setAiError(null);
    try {
      // Save first so the AI sees latest data
      await save();
      const result = await cvService.enhance(id);
      setCv(result.cv);
      setUsage(result.usage);
    } catch (err) {
      setAiError(
        err.response?.data?.message ||
          "Failed to enhance CV. Please try again.",
      );
    } finally {
      setEnhancing(false);
    }
  };

  // Summary keep/revert
  const handleKeepEnhancedSummary = () => {
    setCv((prev) => ({
      ...prev,
      summary: prev.enhancedSummary,
      enhancedSummary: "", // clear the diff once kept
    }));
  };
  const handleRevertEnhancedSummary = () => {
    setCv((prev) => ({ ...prev, enhancedSummary: "" }));
  };

  // Experience keep/revert (per entry)
  const handleKeepEnhancedBullets = (entryIdx) => {
    setCv((prev) => {
      const updated = [...prev.experience];
      const entry = updated[entryIdx];
      updated[entryIdx] = {
        ...entry,
        responsibilities: entry.enhancedResponsibilities,
        enhancedResponsibilities: [],
      };
      return { ...prev, experience: updated };
    });
  };
  const handleRevertEnhancedBullets = (entryIdx) => {
    setCv((prev) => {
      const updated = [...prev.experience];
      updated[entryIdx] = {
        ...updated[entryIdx],
        enhancedResponsibilities: [],
      };
      return { ...prev, experience: updated };
    });
  };

  // Whether the user can hit the Enhance button right now
  const canEnhance =
    !enhancing &&
    !!id &&
    (user?.plan === "pro" || (usage?.used ?? 0) < (usage?.limit ?? 5));

  // ===

  const goNext = () =>
    setStepIdx((i) => Math.min(i + 1, CV_FORM_STEPS.length - 1));
  const goBack = () => setStepIdx((i) => Math.max(i - 1, 0));
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === CV_FORM_STEPS.length - 1;
  const currentStep = CV_FORM_STEPS[stepIdx];
  const progressPct = ((stepIdx + 1) / CV_FORM_STEPS.length) * 100;

  if (loading) {
    return (
      <Layout hideFooter>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-3">Couldn't load this CV</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button asChild>
            <Link to="/dashboard">← Back to dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <PageTransition>
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-16 z-30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {cv?.versionName || "Untitled CV"}
                  </p>
                  <SaveStatus status={saveStatus} lastSavedAt={lastSavedAt} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UsageIndicator
                  used={usage?.used}
                  limit={usage?.limit}
                  plan={user?.plan}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview((v) => !v)}
                  className="hidden lg:inline-flex gap-2"
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide preview
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show preview
                    </>
                  )}
                </Button>
                <DownloadButton cv={cv} targetRef={docRef} size="sm" />
              </div>
            </div>
            <Progress value={progressPct} className="h-1 rounded-none" />
          </div>

          {/* AI error banner (non-blocking) */}
          <AnimatePresence>
            {aiError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-4"
              >
                <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="flex-1">{aiError}</div>
                  <button
                    onClick={() => setAiError(null)}
                    className="text-xs hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main */}
          <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[220px_1fr_minmax(0,_1fr)] gap-8">
            {/* Wizard nav */}
            <aside className="lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3 hidden lg:block">
                  Sections
                </p>
                <WizardNav
                  steps={CV_FORM_STEPS}
                  current={stepIdx}
                  onJump={(i) => {
                    setStepIdx(i);
                    scrollToTop();
                  }}
                />
              </div>

              <div className="hidden lg:block">
                <TemplatePicker
                  value={cv?.template}
                  onChange={(tpl) => patch({ template: tpl })}
                />
              </div>
            </aside>

            {/* Form */}
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-card border border-border rounded-xl p-6 sm:p-8"
                >
                  {currentStep.id === "personal" && (
                    <PersonalInfoSection
                      data={cv?.personalInfo}
                      onChange={patchPersonal}
                    />
                  )}

                  {currentStep.id === "summary" && (
                    <SummarySection
                      targetJobTitle={cv?.targetJobTitle}
                      summary={cv?.summary}
                      enhancedSummary={cv?.enhancedSummary}
                      onTargetChange={(v) => patch({ targetJobTitle: v })}
                      onSummaryChange={(v) => patch({ summary: v })}
                      onEnhance={handleEnhance}
                      onKeepEnhanced={handleKeepEnhancedSummary}
                      onRevertEnhanced={handleRevertEnhancedSummary}
                      enhancing={enhancing}
                      canEnhance={canEnhance}
                    />
                  )}

                  {currentStep.id === "skills" && (
                    <SkillsSection
                      skills={cv?.skills}
                      onChange={(v) => patch({ skills: v })}
                    />
                  )}

                  {currentStep.id === "experience" && (
                    <ExperienceSection
                      experience={cv?.experience}
                      onChange={(v) => patch({ experience: v })}
                      onEnhance={handleEnhance}
                      onKeepEnhancedBullets={handleKeepEnhancedBullets}
                      onRevertEnhancedBullets={handleRevertEnhancedBullets}
                      enhancing={enhancing}
                      canEnhance={canEnhance}
                    />
                  )}

                  {currentStep.id === "education" && (
                    <EducationSection
                      education={cv?.education}
                      onChange={(v) => patch({ education: v })}
                    />
                  )}

                  {currentStep.id === "projects" && (
                    <ProjectsSection
                      projects={cv?.projects}
                      onChange={(v) => patch({ projects: v })}
                    />
                  )}

                  {currentStep.id === "certifications" && (
                    <CertificationsSection
                      certifications={cv?.certifications}
                      onChange={(v) => patch({ certifications: v })}
                    />
                  )}

                  {currentStep.id === "review" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight mb-1">
                          Review &amp; finish
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Pick a template, then download. Your CV is auto-saved.
                        </p>
                      </div>

                      {/* Template picker (visible on mobile here, since it's not in the sidebar there) */}
                      <div className="lg:hidden">
                        <TemplatePicker
                          value={cv?.template}
                          onChange={(tpl) => patch({ template: tpl })}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <DownloadButton cv={cv} targetRef={docRef} />
                        <Button asChild variant="outline">
                          <Link to={`/cv/${id}`}>Open full preview</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={goBack}
                  disabled={isFirst}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>

                <span className="text-xs text-muted-foreground">
                  Step {stepIdx + 1} of {CV_FORM_STEPS.length}
                </span>

                <Button onClick={goNext} disabled={isLast} className="gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {showPreview && (
              <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-9rem)]">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                  Live preview
                </p>
                <CVPreview cv={cv} />
              </aside>
            )}
          </div>
        </div>
      </PageTransition>
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          pointerEvents: "none",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <CVDocument cv={cv} ref={docRef} />
      </div>
    </Layout>
  );
}
