import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});
export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  const prompt = `根据以下主题生成一个演讲幻灯片大纲。每一页幻灯片应包含一个标题和 3-5 个要点。\n\n主题：${topic}`;

  const completion = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    model: "qwen-plus",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content || "";

  const slides = content.split(/\n{2,}/).map((block) => {
    const lines = block.trim().split("\n");
    const title = lines[0]?.replace(/^\d+\.?\s*/, "") || "未命名标题";
    const bullets = lines.slice(1).map((line) => line.replace(/^[-•]\s*/, ""));
    return { title, bullets };
  });

  return NextResponse.json({ slides });
}
