import { CodeEditor } from "@/components/CodeEditor";
import { useCodeModel } from "@/hooks/useCodeModel";
import { Code2, Sparkles, Zap } from "lucide-react";

const Index = () => {
  const { isLoading, generateSuggestion } = useCodeModel();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-glow">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Transformers.js</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Coding Assistant
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your personal mini Copilot. Get intelligent code suggestions powered by transformers running right in your browser.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span>JavaScript & Python</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Instant Suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-glow" />
              <span>Browser-Based AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="container mx-auto px-4 py-12">
        <CodeEditor 
          onGetSuggestion={generateSuggestion}
          isModelLoading={isLoading}
        />
        
        {/* Tips */}
        <div className="mt-8 max-w-6xl mx-auto">
          <div className="bg-muted/50 rounded-lg border border-border p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Press <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">Ctrl+Space</kbd> to get AI suggestions</li>
              <li>• Write a function signature or comment to get completion suggestions</li>
              <li>• The model runs entirely in your browser - no data sent to servers</li>
              <li>• First load may take a moment as the model downloads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
