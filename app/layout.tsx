import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Vision - Detector de Objetos com IA",
  description: "Aplicativo de visão computacional com IA para detecção de objetos e text-to-speech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}