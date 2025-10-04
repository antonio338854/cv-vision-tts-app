
"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Camera, Sparkles } from "lucide-react";

export default function Home() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (base64Image: string) => {
    setImageData(base64Image);
    setResults(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/vision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar imagem");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Erro ao processar imagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CV Vision AI
            </h1>
            <Sparkles className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Detecção inteligente de objetos com IA e narração por voz
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <ImageUploader onImageUpload={handleImageUpload} />

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Analisando imagem com IA...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <p className="text-red-600 dark:text-red-400 font-semibold">
                ❌ {error}
              </p>
            </div>
          )}

          {results && imageData && (
            <ResultsDisplay 
              results={results} 
              imageData={imageData}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Desenvolvido com Next.js, OpenAI Vision API e Web Speech API</p>
        </footer>
      </div>
    </main>
  );
}
