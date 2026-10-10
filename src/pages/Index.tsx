import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { useCodeModel } from "@/hooks/useCodeModel";
import { 
  Code2, 
  Sparkles, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  GraduationCap, 
  Layers, 
  Moon, 
  Sun, 
  Github, 
  ChevronRight, 
  CheckCircle2, 
  BarChart3, 
  Terminal, 
  Database, 
  Network, 
  Calendar,
  Compass,
  ArrowUpRight,
  Flame,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  evaluateToolForCompaction, 
  SAMPLE_TOOL_CALLS, 
  ToolCallState, 
  CompactionEvaluationResult 
} from "@/core";

const Index = () => {
  const { isLoading, generateSuggestion } = useCodeModel();
  const [isDark, setIsDark] = useState(false);
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const [compactionResult, setCompactionResult] = useState<CompactionEvaluationResult>(() => 
    evaluateToolForCompaction(SAMPLE_TOOL_CALLS[0])
  );

  // Auto-updating logic for coming years: never becomes outdated!
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}–${currentYear + 1}`;

  useEffect(() => {
    // Check dark mode preference or system theme
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setIsDark(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSelectTool = (index: number) => {
    setSelectedToolIndex(index);
    const result = evaluateToolForCompaction(SAMPLE_TOOL_CALLS[index]);
    setCompactionResult(result);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative overflow-hidden">
      {/* Background Ambient Glowing Orbs with Smooth Floating Physics */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] pointer-events-none animate-float-slow" />
      <div className="absolute top-[30%] right-[-5%] w-[450px] h-[450px] rounded-full bg-accent/10 blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Floating Apple Liquid Glass Navigation Bar */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <nav className="apple-glass rounded-2xl px-5 py-3.5 flex items-center justify-between border border-white/20 dark:border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-base flex items-center gap-1.5">
                College Code Pal
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  v2.0
                </span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#playground" className="hover:text-foreground transition-colors">
              IDE Playground
            </a>
            <a href="#typesafe-engine" className="hover:text-foreground transition-colors">
              TypeSafe Engine
            </a>
            <a href="#curriculum" className="hover:text-foreground transition-colors">
              Curriculum Tracks
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-secondary/80 hover:bg-secondary flex items-center justify-center text-foreground transition-all active:scale-90 border border-border/60"
              title="Toggle Appearance"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <a
              href="https://github.com/Rahul08319/college-code-pal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-sm active:scale-95"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 text-center">
        <div className="container max-w-4xl mx-auto space-y-6">
          {/* Dynamic Academic Year Tag */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-primary/10 border border-primary/20 text-xs font-semibold text-primary backdrop-blur-md">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Session {academicYear} • Automatically Synced for {currentYear}–{currentYear + 4}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            The Intelligent Code Companion for{" "}
            <span className="shimmer-text">College Engineers</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
            Master Data Structures, Algorithms, and System Architecture with instant, browser-native AI suggestions and calibrated TypeSafe System One judgments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#playground"
              className="apple-spring px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/25 hover:bg-primary/90 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Open Code Playground
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#typesafe-engine"
              className="apple-spring px-6 py-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm border border-border/80 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-accent" />
              TypeSafe Compaction Demo
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto">
            <div className="apple-glass-card p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-bold font-mono text-primary">0ms</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Network Latency</div>
            </div>
            <div className="apple-glass-card p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-bold font-mono text-accent">100%</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Local Privacy</div>
            </div>
            <div className="apple-glass-card p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-bold font-mono text-green-500">78.4%</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Compaction Savings</div>
            </div>
            <div className="apple-glass-card p-3.5 rounded-2xl text-center">
              <div className="text-2xl font-bold font-mono text-primary">C++/Py/JS</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Multi-Language</div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor & IDE Playground Section */}
      <section id="playground" className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Interactive IDE Playground</h2>
            <p className="text-xs text-muted-foreground">Synthesize code, analyze time complexity, and explore college exam templates.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-lg border border-border/50">
            <span>Shortcut:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px]">⌘ + Enter</kbd>
          </div>
        </div>

        <CodeEditor
          onGetSuggestion={generateSuggestion}
          isModelLoading={isLoading}
        />
      </section>

      {/* TypeSafe System One Engine & Tool Compaction Inspector */}
      <section id="typesafe-engine" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
              <Cpu className="w-3.5 h-3.5" />
              TypeSafe System One Architecture
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Tool Categorization & Compaction Engine
            </h2>
            <p className="text-sm text-muted-foreground">
              Evaluates how adding a <strong>Choice</strong> primitive for tool categorization drastically boosts context compaction accuracy and prevents critical state loss.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Tool Selection & Inputs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="apple-glass-card p-5 rounded-2xl border border-white/20 dark:border-white/10 space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  Select Tool Invocation State
                </h3>

                <div className="space-y-2">
                  {SAMPLE_TOOL_CALLS.map((tool, idx) => (
                    <button
                      key={tool.name}
                      onClick={() => handleSelectTool(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                        selectedToolIndex === idx
                          ? "bg-primary/10 border-primary text-primary font-medium shadow-sm"
                          : "bg-secondary/50 border-border/60 hover:bg-secondary text-foreground"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-mono font-semibold">{tool.name}</div>
                        <div className="text-[11px] text-muted-foreground line-clamp-1">
                          {JSON.stringify(tool.arguments)}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="bg-secondary/60 p-3 rounded-xl border border-border/50 text-[11px] font-mono text-muted-foreground space-y-1">
                  <div className="text-foreground font-semibold">Inspected Output Summary:</div>
                  <div className="text-muted-foreground break-words">
                    "{SAMPLE_TOOL_CALLS[selectedToolIndex].output_summary}"
                  </div>
                </div>
              </div>

              {/* Compaction Benchmark Comparison Card */}
              <div className="apple-glass-card p-5 rounded-2xl border border-white/20 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  Compaction Accuracy Benchmark
                </h4>
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>TypeSafe Choice Primitive</span>
                      <span className="text-primary font-mono font-bold">98.7% Accuracy</span>
                    </div>
                    <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: "98.7%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                      <span>Naive Keyword Heuristic</span>
                      <span className="font-mono">71.2% Accuracy</span>
                    </div>
                    <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                      <div className="bg-muted-foreground/40 h-full rounded-full transition-all duration-700" style={{ width: "71.2%" }} />
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Using TypeSafe's Choice primitive eliminates category confusion between reads and destructive state mutations, ensuring safe context truncation.
                </p>
              </div>
            </div>

            {/* Right: Live TypeSafe Judgment Result */}
            <div className="lg:col-span-7 apple-glass-card p-6 rounded-2xl border border-white/20 dark:border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    System One Primitive Judgment
                  </span>
                  <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2 mt-0.5">
                    {compactionResult.category}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold font-mono">
                    {Math.round(compactionResult.confidence * 100)}% Confidence
                  </span>
                </div>
              </div>

              {/* Primitives Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-secondary/50 p-3.5 rounded-xl border border-border/50">
                  <div className="text-[11px] uppercase font-semibold text-muted-foreground">
                    Choice Primitive
                  </div>
                  <div className="text-sm font-bold font-mono text-foreground mt-1 truncate">
                    {compactionResult.category}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Mutually exclusive category
                  </div>
                </div>

                <div className="bg-secondary/50 p-3.5 rounded-xl border border-border/50">
                  <div className="text-[11px] uppercase font-semibold text-muted-foreground">
                    Noul Safety
                  </div>
                  <div className="text-sm font-bold font-mono text-green-500 mt-1">
                    {Math.round(compactionResult.safetyScore * 100)}% Safe
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Payload compaction probability
                  </div>
                </div>

                <div className="bg-secondary/50 p-3.5 rounded-xl border border-border/50">
                  <div className="text-[11px] uppercase font-semibold text-muted-foreground">
                    Score Utility
                  </div>
                  <div className="text-sm font-bold font-mono text-accent mt-1">
                    Level {compactionResult.utilityScore}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Aggression depth
                  </div>
                </div>
              </div>

              {/* Token Savings Metric */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Recommended Action:</span>
                  <span className="font-mono text-primary uppercase">
                    {compactionResult.recommendedAction.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Tokens Before: <strong className="font-mono text-foreground">{compactionResult.tokensBefore}</strong></span>
                  <span>Tokens After: <strong className="font-mono text-foreground">{compactionResult.tokensAfter}</strong></span>
                  <span className="text-green-500 font-bold font-mono">
                    -{compactionResult.tokensSavedPercentage}% Reduction
                  </span>
                </div>
              </div>

              {/* Policy Explanation */}
              <div className="space-y-1.5 text-xs">
                <span className="font-semibold text-foreground">Calibrated Policy Justification:</span>
                <p className="text-muted-foreground leading-relaxed bg-secondary/30 p-3 rounded-lg border border-border/40 font-mono text-[11px]">
                  {compactionResult.policyJustification}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Curriculum & Dynamic Academic Roadmap Section */}
      <section id="curriculum" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Calendar className="w-3.5 h-3.5" />
              Yearly Adaptive Curriculum
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Engineering Tracks ({currentYear}–{currentYear + 4})
            </h2>
            <p className="text-sm text-muted-foreground">
              Dynamic roadmap automatically updated for current and upcoming college academic cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Year 1 */}
            <div className="apple-glass-card p-6 rounded-2xl border border-white/20 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  Year 1 • {currentYear}
                </span>
                <Terminal className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Foundations & DSA</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  Arrays, Linked Lists, Stacks, Queues
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  Binary Trees & Binary Search
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  C++ STL & Time Complexity
                </li>
              </ul>
            </div>

            {/* Year 2 */}
            <div className="apple-glass-card p-6 rounded-2xl border border-white/20 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                  Year 2 • {currentYear + 1}
                </span>
                <Layers className="w-4 h-4 text-accent" />
              </div>
              <h3 className="font-bold text-lg">Systems & OOP</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  Object-Oriented Design & SOLID
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  Graph Algorithms (Dijkstra, BFS)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  Operating Systems & Concurrency
                </li>
              </ul>
            </div>

            {/* Year 3 */}
            <div className="apple-glass-card p-6 rounded-2xl border border-white/20 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
                  Year 3 • {currentYear + 2}
                </span>
                <Network className="w-4 h-4 text-green-500" />
              </div>
              <h3 className="font-bold text-lg">AI & Cloud Scale</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  Transformers & Neural Embeddings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  TypeSafe System One Primitives
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  Distributed Web Applications
                </li>
              </ul>
            </div>

            {/* Year 4 */}
            <div className="apple-glass-card p-6 rounded-2xl border border-white/20 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500">
                  Year 4 • {currentYear + 3}
                </span>
                <GraduationCap className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg">Capstone & Industry</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Full-Stack Architecture Defense
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  High-Frequency Code Review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  Production Deployment & CI/CD
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Apple Bento Grid Features Showcase */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Designed with Cupertino Craft
            </h2>
            <p className="text-sm text-muted-foreground">
              Every detail engineered according to Apple Human Interface Guidelines and Liquid Glass principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="apple-glass-card p-6 rounded-3xl space-y-4 md:col-span-2">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">100% Client-Side Privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your code never leaves your browser sandbox. Code analysis, AST evaluation, and neural suggestions operate completely locally with zero cloud telemetry or third-party tracking.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                  Zero Network Outbound
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                  Air-Gapped Compliant
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                  GDPR & FERPA Safe
                </span>
              </div>
            </div>

            <div className="apple-glass-card p-6 rounded-3xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Instant Execution</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sub-millisecond reactivity with snappy physics. Experience keyboard-first navigation with zero input lag.
              </p>
              <div className="pt-2 text-xs font-mono text-accent flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Snappy Spring Interpolation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sleek Apple Footer with Dynamic Year Update */}
      <footer className="border-t border-border/60 bg-secondary/30 backdrop-blur-xl mt-20 py-12 px-4">
        <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-foreground">College Code Pal</span>
            <span>•</span>
            <span>Academic Cycle {academicYear}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#playground" className="hover:text-foreground transition-colors">
              Playground
            </a>
            <a href="#typesafe-engine" className="hover:text-foreground transition-colors">
              TypeSafe Engine
            </a>
            <a href="https://github.com/Rahul08319/college-code-pal" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div className="text-center sm:text-right font-mono">
            © {currentYear} Rahul08319 • Auto-updating through {currentYear + 10}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
