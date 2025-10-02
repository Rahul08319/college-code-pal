import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Code2 } from "lucide-react";
import { toast } from "sonner";

interface CodeEditorProps {
  onGetSuggestion: (code: string) => Promise<string>;
  isModelLoading: boolean;
}

export const CodeEditor = ({ onGetSuggestion, isModelLoading }: CodeEditorProps) => {
  const [code, setCode] = useState(`// Start typing your code here...\n// Press Ctrl+Space or click "Get AI Suggestion" for help\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n`);
  const [suggestion, setSuggestion] = useState("");
  const [isGettingSuggestion, setIsGettingSuggestion] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGetSuggestion = async () => {
    if (isModelLoading) {
      toast.info("Model is still loading, please wait...");
      return;
    }

    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }

    setIsGettingSuggestion(true);
    setSuggestion("");
    
    try {
      const result = await onGetSuggestion(code);
      setSuggestion(result);
      toast.success("Suggestion received!");
    } catch (error) {
      toast.error("Failed to get suggestion");
      console.error(error);
    } finally {
      setIsGettingSuggestion(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === " ") {
      e.preventDefault();
      handleGetSuggestion();
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      setCode(code + "\n\n" + suggestion);
      setSuggestion("");
      toast.success("Suggestion applied!");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Card className="bg-card border-border shadow-card overflow-hidden">
        <div className="bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">editor.js</span>
          </div>
          <div className="flex items-center gap-2">
            {isModelLoading && (
              <span className="text-xs text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading model...
              </span>
            )}
            <Button
              onClick={handleGetSuggestion}
              disabled={isModelLoading || isGettingSuggestion}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isGettingSuggestion ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get AI Suggestion
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-[500px] bg-code-bg text-foreground font-mono text-sm p-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="// Start coding here..."
            spellCheck={false}
          />
        </div>
      </Card>

      {suggestion && (
        <Card className="bg-card border-primary/50 shadow-glow animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-primary/10 border-b border-primary/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium text-sm text-primary">AI Suggestion</span>
            </div>
            <Button
              onClick={applySuggestion}
              size="sm"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Apply Suggestion
            </Button>
          </div>
          <div className="p-6">
            <pre className="font-mono text-sm text-foreground whitespace-pre-wrap break-words">
              {suggestion}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
};
