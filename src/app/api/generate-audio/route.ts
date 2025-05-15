import { NextRequest, NextResponse } from "next/server";

// 真实生产中应使用第三方 TTS 服务，例如 ElevenLabs、百度语音合成、腾讯云等

export async function POST(req: NextRequest) {
  const { script } = await req.json();

  // 模拟语音生成后的音频地址
  const dummyAudioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return NextResponse.json({ audioUrl: dummyAudioUrl });
}
