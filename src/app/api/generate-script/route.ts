import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});
export async function POST(req: NextRequest) {
  const { slides } = await req.json();

  const outline = slides
    .map((s: any) => `幻灯片标题：${s.title}\n要点：${s.bullets.join("；")}`)
    .join("\n\n");

  const prompt = `根据以下演讲大纲生成一篇完整、自然的演讲稿，语气亲切易懂，适合口头表达。\n\n${outline}`;

  const completion = await openai.chat.completions.create({
    model: "qwen-plus",
    messages: [{ role: "user", content: prompt }],
  });

  const script = completion.choices[0].message.content || "";

  return NextResponse.json({ script });
}
