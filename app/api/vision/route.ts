import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Nenhuma imagem fornecida" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada. Configure no Vercel Dashboard." },
        { status: 500 }
      );
    }

    // Chamar OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta imagem em detalhes e forneça:
1. Uma descrição geral da imagem
2. Uma lista de todos os objetos, pessoas ou elementos visíveis
3. Uma análise detalhada do contexto e ambiente

Responda em português do Brasil no seguinte formato JSON:
{
  "description": "descrição breve da imagem",
  "objects": ["objeto1", "objeto2", "objeto3"],
  "detailedAnalysis": "análise detalhada e completa"
}`,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("Nenhuma resposta da IA");
    }

    // Tentar parsear JSON da resposta
    let parsedResult;
    try {
      // Extrair JSON se estiver em markdown code block
      const jsonMatch = content.match(/```json\n?([\s\S]*?)```/) || 
                       content.match(/```\n?([\s\S]*?)```/);

      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[1]);
      } else {
        parsedResult = JSON.parse(content);
      }
    } catch (parseError) {
      // Se falhar o parse, criar estrutura básica
      parsedResult = {
        description: content,
        objects: ["Análise disponível na descrição"],
        detailedAnalysis: content,
      };
    }

    return NextResponse.json(parsedResult);
  } catch (error: any) {
    console.error("Erro na API Vision:", error);
    return NextResponse.json(
      { 
        error: "Erro ao processar imagem",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de Visão Computacional - Use POST com imagem em base64",
    status: "online",
  });
}
