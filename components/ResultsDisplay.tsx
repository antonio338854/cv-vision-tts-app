
"use client";

import { useState } from "react";
import { Volume2, VolumeX, CheckCircle } from "lucide-react";

interface ResultsDisplayProps {
  results: {
    description: string;
    objects: string[];
    detailedAnalysis: string;
  };
  imageData: string;
}

export default function ResultsDisplay({ results, imageData }: ResultsDisplayProps) {
  const [speaking, setSpeaking] = useState(false);

  const speakResults = () => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta Text-to-Speech");
      return;
    }

    // Cancelar qualquer fala em andamento
    window.speechSynthesis.cancel();

    setSpeaking(true);

    const textToSpeak = `Análise da imagem: ${results.description}. Objetos detectados: ${results.objects.join(", ")}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setSpeaking(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      alert("Erro ao reproduzir áudio");
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          📸 Imagem Analisada
        </h2>
        <img
          src={imageData}
          alt="Imagem analisada"
          className="w-full max-h-96 object-contain rounded-lg"
        />
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            🤖 Resultados da IA
          </h2>

          {speaking ? (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg"
            >
              <VolumeX className="w-5 h-5" />
              Parar Narração
            </button>
          ) : (
            <button
              onClick={speakResults}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Volume2 className="w-5 h-5" />
              Narrar Resultados
            </button>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Descrição Geral:
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {results.description}
          </p>
        </div>

        {/* Objects List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Objetos Detectados:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.objects.map((obj, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {obj}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Análise Detalhada:
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {results.detailedAnalysis}
          </p>
        </div>
      </div>
    </div>
  );
}
