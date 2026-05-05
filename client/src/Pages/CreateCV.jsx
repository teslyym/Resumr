import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/shared/PageTransition";
import { cvService } from "@/services/cvService";
import { useAutoSave } from "@/lib/useAutoSave";
import { CV_FORM_STEPS } from "@/components/cv/cvFormSteps";
import WizardNav from "@/components/cv/WizardNav";
import SaveStatus from "@/components/cv/SaveStatus";
import CVPreview from "@/components/cv/CVPreview";
import PersonalInfoSection from "@/components/cv/sections/PersonalInfoSection";
import SummarySection from "@/components/cv/sections/SummarySection";
import SkillsSection from "@/components/cv/sections/SkillsSection";

export default function CreateCV() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [showPreview, setShowPreview] = useState(true);

  // Load existing CV (or treat as new if no id)
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

  // Stable save function for the auto-save hook
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

  // Update helpers — patch a field on the cv state
  const patch = (changes) => setCv((prev) => ({ ...prev, ...changes }));
  const patchPersonal = (newPersonal) =>
    setCv((prev) => ({ ...prev, personalInfo: newPersonal }));

  const goNext = () =>
    setStepIdx((i) => Math.min(i + 1, CV_FORM_STEPS.length - 1));
  const goBack = () => setStepIdx((i) => Math.max(i - 1, 0));
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === CV_FORM_STEPS.length - 1;
  const currentStep = CV_FORM_STEPS[stepIdx];
  const progressPct = ((stepIdx + 1) / CV_FORM_STEPS.length) * 100;

  // Loading state
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

              <div className="flex items-center gap-2">
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
              </div>
            </div>
            {/* Progress bar */}
            <Progress value={progressPct} className="h-1 rounded-none" />
          </div>

          {/* Main */}
          <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[220px_1fr_minmax(0,_1fr)] gap-8">
            {/* Wizard nav (sidebar on desktop, top on mobile) */}
            <aside className="lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3 hidden lg:block">
                Sections
              </p>
              <WizardNav
                steps={CV_FORM_STEPS}
                current={stepIdx}
                onJump={(i) => setStepIdx(i)}
              />
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
                      onTargetChange={(v) => patch({ targetJobTitle: v })}
                      onSummaryChange={(v) => patch({ summary: v })}
                    />
                  )}

                  {currentStep.id === "skills" && (
                    <SkillsSection
                      skills={cv?.skills}
                      onChange={(v) => patch({ skills: v })}
                    />
                  )}

                  {[
                    "experience",
                    "education",
                    "projects",
                    "certifications",
                  ].includes(currentStep.id) && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="text-sm italic">
                        {currentStep.label} section coming in the next pass.
                      </p>
                    </div>
                  )}

                  {currentStep.id === "review" && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Review &amp; finish
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Looks good? Your CV is auto-saved. Head back to the
                        dashboard or open it to download.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={save} variant="outline">
                          Save now
                        </Button>
                        <Button asChild>
                          <Link to={`/cv/${id}`}>Open CV</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step controls */}
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

            {/* Preview */}
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
    </Layout>
  );
}
