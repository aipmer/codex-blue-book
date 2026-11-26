---
title: "Ch.04 Video Understanding & Gemini Live API Real-Time Applications"
description: "Turn bug screen recordings into timestamped root-cause diagnoses, build low-latency bidirectional audio/video assistants with @google/genai Live API, and eliminate multimodal hallucination."
lastUpdated: 2026-11-26
---

[Back to Gemini Hub](/en/gemini/) | [Prev: AI Studio Handoff](/en/gemini/ch03_ai_studio_handoff) | [Next: Workspace MCP Automation](/en/gemini/ch05_workspace_mcp)

# Ch.04 Video Understanding & Gemini Live API Real-Time Applications

> 🎯 **Engineering pain solved**: Race-condition UI flickers cannot be explained in text bug reports, while chaining separate `STT → LLM → TTS` services for real-time voice/camera assistants introduces 3-second lag and breaks when users interrupt mid-sentence.
>
> 💡 **What you ship**: A runnable video bug-repro analyzer with exact `MM:SS` timeline schemas, a bidirectional **Gemini Live API** WebSocket connector supporting native barge-in, and three anti-hallucination guardrails.
>
> ⚡ **Bottom line**: Feed screen recordings for timing bugs and use native Live WebSockets for real-time audio/video—stop gluing three brittle media pipelines together.

Static screenshots miss the entire class of bugs that live on a timeline: state-race flickers, modal focus traps, and mobile keyboards shoving submit buttons off screen. Gemini's native video understanding and **Gemini Live API** turn continuous video and bidirectional audio into first-class developer primitives.

---

## 4.1 Video-to-Fix: Timestamped State-Machine Diagnosis

Instead of asking "what went wrong?", force the model to return a strict `MM:SS` timeline via the Files API so large MP4s stay out of JSON memory buffers:

```typescript
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function diagnoseBugVideo(videoPath: string) {
  const uploaded = await ai.files.upload({
    file: videoPath,
    config: { mimeType: "video/mp4" }
  });

  let fileState = await ai.files.get({ name: uploaded.name! });
  while (fileState.state === "PROCESSING") {
    await new Promise((r) => setTimeout(r, 2000));
    fileState = await ai.files.get({ name: uploaded.name! });
  }
  if (fileState.state !== "ACTIVE") {
    throw new Error(`Video processing failed: ${fileState.state}`);
  }

  const res = await ai.models.generateContent({
    model: "gemini-4-neon",
    contents: [
      {
        role: "user",
        parts: [
          { fileData: { fileUri: fileState.uri!, mimeType: "video/mp4" } },
          {
            text: "List every user interaction and visual anomaly with exact MM:SS timestamps, then infer the most likely frontend state or race condition root cause."
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          timeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timestamp: { type: Type.STRING },
                action: { type: Type.STRING },
                observedUi: { type: Type.STRING }
              },
              required: ["timestamp", "action", "observedUi"]
            }
          },
          suspectedRootCause: { type: Type.STRING },
          verificationSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["timeline", "suspectedRootCause", "verificationSteps"]
      }
    }
  });

  console.log(res.text);
  await ai.files.delete({ name: uploaded.name! });
}

diagnoseBugVideo("./bug-repro.mp4").catch(console.error);
```

Feed that JSON timeline into local `agy` alongside the offending component to trace the exact state update.

---

## 4.2 Gemini Live API: Real-Time Bidirectional Audio & Video

Gemini Live streams audio and JPEG frames over one stateful WebSocket and supports native **barge-in** (immediately cutting off model playback when the user speaks). Pin these exact media formats to prevent silent sessions or garbled audio:

| Channel | Required Format | Engineering Practice |
| :--- | :--- | :--- |
| **Upstream Audio** | Raw 16-bit PCM, `16kHz`, Little-Endian, mono | Capture via `AudioWorklet` in 100ms chunks |
| **Upstream Video** | JPEG frames, `<= 1 FPS`, `768px` long edge | 1 FPS handles inspection/coaching without burning bandwidth |
| **Downstream Audio** | Raw 16-bit PCM, `24kHz`, Little-Endian | Flush queued audio buffers immediately on `interrupted: true` |
| **Auth Security** | Server-minted **Ephemeral Token** | Never embed long-lived `GEMINI_API_KEY` in client WebSocket code |

```typescript
import { GoogleGenAI, Modality } from "@google/genai";

export async function startLiveAssistant(
  ephemeralToken: string,
  onAudioChunk: (pcm24kBase64: string) => void,
  onInterrupt: () => void
) {
  const ai = new GoogleGenAI({ apiKey: ephemeralToken });

  const session = await ai.live.connect({
    model: process.env.GEMINI_LIVE_MODEL || "gemini-live-2.5-flash-preview",
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction:
        "You are a concise hardware inspection assistant. Speak in short sentences. Only report defects clearly visible in the latest camera frames."
    },
    callbacks: {
      onmessage: (msg) => {
        if (msg.serverContent?.interrupted) {
          onInterrupt();
          return;
        }
        const parts = msg.serverContent?.modelTurn?.parts || [];
        for (const part of parts) {
          if (part.inlineData?.data) onAudioChunk(part.inlineData.data);
        }
      },
      onerror: (err) => console.error("Live session error:", err),
      onclose: (ev) => console.log("Live session closed:", ev.reason)
    }
  });

  return {
    sendAudioPcm16k(base64Chunk: string) {
      session.sendRealtimeInput({
        audio: { data: base64Chunk, mimeType: "audio/pcm;rate=16000" }
      });
    },
    sendCameraFrame(jpegBase64: string) {
      session.sendRealtimeInput({
        media: { data: jpegBase64, mimeType: "image/jpeg" }
      });
    },
    close: () => session.close()
  };
}
```

---

## 4.3 Three Anti-Hallucination Guardrails for Media Apps

1. **Anchor every claim**: Require `timestamp` (video) or `bbox` (image) plus `visibility: "clear" | "uncertain"` in your JSON schema; flag `uncertain` items for human review.
2. **Ban gap-filling**: State explicitly in `systemInstruction` that unreadable text or off-frame details must return `null` rather than inferred guesses.
3. **Cap FPS and duration server-side**: Enforce `<= 1 FPS` and hard session durations, budgeting cost upfront with [check_gemini_quota.mjs](https://github.com/aipmer/codex-blue-book/blob/main/examples/gemini-antigravity-kit/scripts/check_gemini_quota.mjs) (`--video-seconds`).

---

## 🚀 3-Step Quickstart

1. **Run offline video diagnosis**: Record a 15-second UI bug repro as `bug-repro.mp4` and execute `diagnoseBugVideo` to inspect the timestamped JSON timeline.
2. **Price your video budget**: Run `node examples/gemini-antigravity-kit/scripts/check_gemini_quota.mjs --model gemini-4-hydrogen --video-seconds 300 --output-tokens 8000 --budget 1`.
3. **Test Live barge-in**: Open AI Studio Stream Realtime with mic + screen share, interrupt mid-sentence to observe latency, then integrate the WebSocket wrapper above behind ephemeral tokens.

---

## 🛡️ Pitfall Recovery Table

| Failure Mode | Root Cause | Immediate Fix |
| :--- | :--- | :--- |
| Live audio plays slow-motion or chipmunk-pitched | 24kHz server PCM played on a 16kHz or 48kHz `AudioContext` | Construct playback `AudioContext({ sampleRate: 24000 })` while resampling mic capture to `16000` |
| Old audio keeps playing after user interrupts | Client ignores `serverContent.interrupted` | Call `.stop()` on all queued `AudioBufferSourceNode` instances and reset playback cursor on interrupt |
| Long video uploads time out or spike API bills | Raw 4K 60fps capture uploaded without downsampling | Transcode first: `ffmpeg -i raw.mp4 -vf "fps=1,scale=960:-2" -c:v libx264 -crf 28 trim.mp4` |

---

[Back to Gemini Hub](/en/gemini/) | [Prev: AI Studio Handoff](/en/gemini/ch03_ai_studio_handoff) | [Next: Workspace MCP Automation](/en/gemini/ch05_workspace_mcp)
