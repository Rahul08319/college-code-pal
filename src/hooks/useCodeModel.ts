import { useState, useEffect } from "react";
import { pipeline } from "@huggingface/transformers";

export const useCodeModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [generator, setGenerator] = useState<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading code generation model...");
        
        // Using a lightweight, browser-optimized model
        const pipe = await pipeline(
          "text-generation",
          "onnx-community/gpt2",
          { 
            device: "wasm",
            dtype: "q8"
          }
        );
        
        setGenerator(pipe);
        console.log("Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
        console.error("Full error details:", JSON.stringify(error, null, 2));
      } finally {
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  const generateSuggestion = async (code: string): Promise<string> => {
    if (!generator) {
      throw new Error("Model not loaded yet");
    }

    try {
      const result = await generator(code, {
        max_new_tokens: 100,
        temperature: 0.7,
        do_sample: true,
        top_k: 50,
      });

      return result[0].generated_text.slice(code.length);
    } catch (error) {
      console.error("Generation error:", error);
      throw error;
    }
  };

  return { isLoading, generateSuggestion };
};
