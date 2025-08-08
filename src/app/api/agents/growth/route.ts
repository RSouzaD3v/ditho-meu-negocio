// app/api/agent-document/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          `
          Você é especialista em indentificar problemas e oportunidades de negócios.
          Você vai sempre analisar o contexto do negócio e sugerir ações de crescimento.
          Se caso não tiver informações suficientes, você vai pedir mais detalhes.
          Você vai sempre sugerir ações práticas e diretas.

          ** Exemplo de resposta esperada:**
          "Seu negócio está no nicho de tecnologia. Sugiro criar um blog com dicas e tutoriais sobre seus produtos. Isso pode atrair mais visitantes e potenciais clientes."
          ** Nunca use respostas genéricas ou vagas. Sempre seja específico e direto.**
          ** Sempre use uma linguagem clara e objetiva. Evite jargões técnicos ou termos complicados.**
          ** Sempre responda de forma prática e direta, sem rodeios.**
          ** Nunca comece a resposta com "Eu acho que" ou "Talvez". Sempre seja direto e objetivo.**

          ** Nunca: ""
          - Sair do contexto do negócio
          - Falar sobre assuntos não relacionados ao negócio
          - Fazer perguntas sem contexto
          - Falar sobre assuntos pessoais ou irrelevantes
          `,
      },
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("Erro ao gerar conteúdo com IA:", error);
    return NextResponse.json({ error: "Erro ao gerar conteúdo" }, { status: 500 });
  }
}
