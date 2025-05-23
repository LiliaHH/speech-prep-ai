"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function SpeechPrepApp() {
  const [step, setStep] = useState("outline");
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState([]);
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const generateSlidesFromTopic = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setSlides(data.slides);
      setStep("slides");
    } catch (err) {
      alert("生成失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const generateScriptFromSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const data = await res.json();
      setScript(data.script);
      setStep("script");
    } catch (err) {
      alert("生成失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const generateAudioFromScript = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      });
      const data = await res.json();
      setAudioUrl(data.audioUrl);
    } catch (err) {
      alert("音频生成失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "outline":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">请输入你的演讲主题</h2>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：人工智能的未来"
            />
            <Button
              className="mt-4"
              onClick={generateSlidesFromTopic}
              disabled={loading}
            >
              {loading ? "生成中..." : "生成大纲"}
            </Button>
          </div>
        );
      case "slides":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">编辑你的幻灯片</h2>
            {slides.map((slide, idx) => (
              <div key={idx} className="border p-2 mb-2 rounded">
                <Input
                  className="mb-2"
                  value={slide.title}
                  onChange={(e) => {
                    const newSlides = [...slides];
                    newSlides[idx].title = e.target.value;
                    setSlides(newSlides);
                  }}
                />
                {slide.bullets.map((bullet, bidx) => (
                  <Input
                    key={bidx}
                    className="mb-1"
                    value={bullet}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[idx].bullets[bidx] = e.target.value;
                      setSlides(newSlides);
                    }}
                  />
                ))}
              </div>
            ))}
            <Button onClick={generateScriptFromSlides} disabled={loading}>
              {loading ? "生成中..." : "生成演讲稿"}
            </Button>
          </div>
        );
      case "script":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">AI 生成的演讲稿</h2>
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={10}
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={() => alert("正在导出...")}>导出演讲稿</Button>
              <Button onClick={generateAudioFromScript} disabled={loading}>
                {loading ? "生成语音中..." : "AI 试讲"}
              </Button>
            </div>
            {audioUrl && (
              <audio controls className="mt-4 w-full">
                <source src={audioUrl} type="audio/mpeg" />
                您的浏览器不支持音频播放。
              </audio>
            )}
          </div>
        );
        case "map-mind":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">思维导图</h2>
            <div
              ref={containerRef}
              style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
            ></div>
            <p className="mt-4">
              这是一个简单的思维导图示例。您可以根据需要进行修改和扩展。
            </p>  
          </div>
        );
     
        default:
        return null;
    }
  };

 const containerRef = useRef<HTMLDivElement|null >(null);
  useEffect(() => {
   if(step==='map-mind'){
    const loadMindMap = async () => {
      const MindMap = (await import("simple-mind-map")).default;

      new MindMap({
        el: containerRef.current!,
        data: {
           "data": {
        "text": "根节点"
    },
    "children": [{"data": {
        "text": "子节点1"
    }}, 
    {         "data": {
        "text": "子节点2"
    }, }]
        },
      });
    };

    loadMindMap();}
  }, [step]);

  return (
    <div className="max-w-3xl mx-auto mt-10 shadow-lg rounded-xl border">

      <div className="flex border-b p-4 justify-between items-center">
        <h1 className="text-2xl font-bold">SpeechPrep AI 演讲助手</h1>
        <div>
          <Button
            variant={step === "outline" ? "default" : "ghost"}
            onClick={() => setStep("outline")}
          >
            主题
          </Button>
          <Button
            variant={step === "slides" ? "default" : "ghost"}
            onClick={() => setStep("slides")}
          >
            幻灯片
          </Button>
          <Button
            variant={step === "script" ? "default" : "ghost"}
            onClick={() => setStep("script")}
          >
            演讲稿
          </Button>
             <Button
            variant={step === "map-mind" ? "default" : "ghost"}
            onClick={() => setStep("map-mind")}
          >
            思维导图
          </Button>
        </div>
      </div>
      {renderStep()}
    </div>
  );
}
