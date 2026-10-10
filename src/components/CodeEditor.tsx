import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Sparkles, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Play, 
  Layers, 
  FileCode, 
  Clock, 
  Cpu, 
  BookOpen,
  Terminal,
  Zap,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { useCodeModel, CodeAnalysisResult } from "@/hooks/useCodeModel";

interface CodeEditorProps {
  onGetSuggestion: (code: string, language?: string) => Promise<string>;
  isModelLoading: boolean;
}

const TEMPLATES = [
  {
    name: "Two Sum (DSA)",
    lang: "javascript",
    code: `// College DSA: Two Sum (Hash Map Approach)
// Given an array of integers nums and an integer target,
// return indices of the two numbers that add up to target.

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
`,
  },
  {
    name: "Binary Search (C++)",
    lang: "cpp",
    code: `// College Algorithms: Iterative Binary Search
#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    std::vector<int> nums = {1, 3, 5, 7, 9, 11};
    int index = binarySearch(nums, 7);
    std::cout << "Target found at index: " << index << std::endl;
    return 0;
}
`,
  },
  {
    name: "DP Fibonacci (Python)",
    lang: "python",
    code: `# College DP: Memoized Fibonacci Series
def fibonacci_memo(n: int, memo: dict = None) -> int:
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

if __name__ == "__main__":
    n = 10
    print(f"Fibonacci({n}) =", fibonacci_memo(n))
`,
  },
  {
    name: "Reverse Linked List",
    lang: "javascript",
    code: `// College Data Structures: Singly Linked List Reversal
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}
`,
  },
];

export const CodeEditor = ({ onGetSuggestion, isModelLoading }: CodeEditorProps) => {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [language, setLanguage] = useState("javascript");
  const [suggestion, setSuggestion] = useState("");
  const [analysis, setAnalysis] = useState<CodeAnalysisResult | null>(null);
  const [isGettingSuggestion, setIsGettingSuggestion] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "suggestion" | "analysis">("code");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { explainCode } = useCodeModel();

  // Line count computation for Apple-grade editor gutter
  const lineCount = Math.max(code.split("\n").length, 12);

  const handleGetSuggestion = async () => {
    if (isModelLoading) {
      toast.info("Model initializing, please hold...");
      return;
    }

    if (!code.trim()) {
      toast.error("Please enter code or select a college template");
      return;
    }

    setIsGettingSuggestion(true);
    setSuggestion("");
    
    try {
      const result = await onGetSuggestion(code, language);
      setSuggestion(result);
      setActiveTab("suggestion");
      toast.success("AI suggestion generated with Apple neural engine!");
    } catch (error) {
      toast.error("Failed to generate suggestion");
      console.error(error);
    } finally {
      setIsGettingSuggestion(false);
    }
  };

  const handleAnalyzeCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter code to analyze");
      return;
    }
    setIsAnalyzing(true);
    try {
      const result = await explainCode(code);
      setAnalysis(result);
      setActiveTab("analysis");
      toast.success("Code complexity analyzed!");
    } catch (e) {
      toast.error("Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      handleGetSuggestion();
    }
    // Allow Tab key indent in textarea
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      setCode(code + "\n\n" + suggestion);
      setActiveTab("code");
      toast.success("Suggestion merged into your workspace!");
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const ext = language === "python" ? "py" : language === "cpp" ? "cpp" : "js";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `college-code-pal-solution.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  const handleSelectTemplate = (t: typeof TEMPLATES[0]) => {
    setCode(t.code);
    setLanguage(t.lang);
    setSuggestion("");
    setAnalysis(null);
    setActiveTab("code");
    toast.info(`Loaded ${t.name}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* College Templates Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mr-1">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            Lab Templates:
          </span>
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => handleSelectTemplate(t)}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-primary/10 hover:text-primary transition-all text-muted-foreground font-medium border border-border/60 hover:border-primary/30 whitespace-nowrap active:scale-95"
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs bg-secondary border border-border/80 text-foreground px-3 py-1.5 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            <option value="javascript">JavaScript (ES2026)</option>
            <option value="cpp">C++20 (DSA / CP)</option>
            <option value="python">Python 3.12</option>
            <option value="java">Java 21</option>
          </select>
        </div>
      </div>

      {/* Apple macOS Realistic Window Chrome */}
      <div className="apple-glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 transition-all">
        {/* macOS Title Bar with Traffic Lights */}
        <div className="bg-secondary/60 dark:bg-black/40 border-b border-border/70 px-4 py-3 flex items-center justify-between select-none">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm hover:opacity-80 transition cursor-pointer" title="Close Workspace" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm hover:opacity-80 transition cursor-pointer" title="Minimize" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm hover:opacity-80 transition cursor-pointer" title="Zoom / Expand" />
            <div className="ml-3 hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>solution.{language === "python" ? "py" : language === "cpp" ? "cpp" : "js"}</span>
            </div>
          </div>

          {/* Central Mode Selector */}
          <div className="flex items-center bg-background/70 dark:bg-white/5 p-0.5 rounded-lg border border-border/60 text-xs font-medium">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === "code"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("suggestion")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                activeTab === "suggestion"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              AI Suggestion {suggestion ? "•" : ""}
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                activeTab === "analysis"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cpu className="w-3 h-3" />
              Big-O
            </button>
          </div>

          {/* Action Tool Buttons */}
          <div className="flex items-center gap-1.5">
            <Button
              onClick={copyCode}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              onClick={downloadCode}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              title="Download file"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setCode("")}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              title="Clear editor"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Editor Content Area */}
        {activeTab === "code" && (
          <div className="relative flex bg-code-bg">
            {/* Realistic Line Numbers Gutter */}
            <div className="hidden sm:block py-6 px-3 bg-secondary/30 dark:bg-black/20 text-muted-foreground/40 font-mono text-xs select-none text-right border-r border-border/40 min-w-[3rem]">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Input Area */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-[460px] bg-transparent text-foreground font-mono text-sm leading-6 p-6 resize-none focus:outline-none focus:ring-0 selection:bg-primary/20 selection:text-primary transition-all"
                placeholder="// Write your code or paste your college problem statement..."
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {/* AI Suggestion Panel */}
        {activeTab === "suggestion" && (
          <div className="p-6 bg-code-bg min-h-[460px] flex flex-col justify-between">
            {suggestion ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">Synthesized Solution</span>
                  </div>
                  <Button
                    onClick={applySuggestion}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs px-4"
                  >
                    Merge to Workspace
                  </Button>
                </div>
                <pre className="font-mono text-sm text-foreground bg-card/60 p-5 rounded-xl border border-border/60 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {suggestion}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">No AI suggestion generated yet</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mt-1">
                    Click "Get AI Suggestion" or press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground text-[10px] font-mono">⌘+Enter</kbd> to generate optimized code.
                  </p>
                </div>
                <Button onClick={handleGetSuggestion} disabled={isGettingSuggestion} size="sm">
                  Generate Now
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Big-O Analysis Panel */}
        {activeTab === "analysis" && (
          <div className="p-6 bg-code-bg min-h-[460px]">
            {analysis ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="apple-glass-card p-4 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                      <Clock className="w-4 h-4 text-primary" />
                      Time Complexity
                    </div>
                    <div className="text-2xl font-bold font-mono text-primary mt-1">
                      {analysis.timeComplexity}
                    </div>
                  </div>
                  <div className="apple-glass-card p-4 rounded-xl border border-accent/20">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                      <Cpu className="w-4 h-4 text-accent" />
                      Space Complexity
                    </div>
                    <div className="text-2xl font-bold font-mono text-accent mt-1">
                      {analysis.spaceComplexity}
                    </div>
                  </div>
                </div>

                <div className="apple-glass-card p-5 rounded-xl border border-border/60">
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Algorithmic Architecture
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {analysis.explanation}
                  </p>
                </div>

                <div className="apple-glass-card p-5 rounded-xl border border-border/60">
                  <h5 className="font-semibold text-sm mb-3">College Exam Best Practices</h5>
                  <ul className="space-y-2">
                    {analysis.bestPractices.map((bp, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {bp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Analyze Big-O Complexity</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mt-1">
                    Evaluate execution order, nested iteration bounds, and auxiliary memory footprints.
                  </p>
                </div>
                <Button onClick={handleAnalyzeCode} disabled={isAnalyzing} size="sm">
                  Run Big-O Benchmark
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions & Status Bar */}
        <div className="bg-secondary/40 dark:bg-black/30 border-t border-border/60 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Neural Engine Ready
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline font-mono">
              {code.length} chars | {code.split("\n").length} lines
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleAnalyzeCode}
              disabled={isAnalyzing}
              variant="outline"
              size="sm"
              className="text-xs h-8 border-border/80 hover:bg-secondary active:scale-95 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Cpu className="w-3.5 h-3.5 mr-1.5 text-accent" />
                  Analyze Big-O
                </>
              )}
            </Button>

            <Button
              onClick={handleGetSuggestion}
              disabled={isModelLoading || isGettingSuggestion}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs h-8 px-4 shadow-md shadow-primary/20 active:scale-95 transition-all"
            >
              {isGettingSuggestion ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Get AI Suggestion
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
