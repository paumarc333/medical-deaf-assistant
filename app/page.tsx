"use client";

import { useState } from "react";
import Avatar from "../components/Avatar";
import QuickReplies from "../components/QuickReplies";

export default function Home() {
  const [text, setText] = useState("");

  const startListening = () => {
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "es-ES";
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setText(transcript);
    };

    recognition.start();
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2937_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#0f766e_0%,transparent_30%)] opacity-40" />

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden lg:flex w-80 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 flex-col">
          <div className="mb-10">
            <p className="text-sm text-gray-500">AI-first medical interpreter</p>
            <h1 className="text-2xl font-semibold mt-1">Medical Deaf</h1>
          </div>

          <button className="bg-white text-black rounded-2xl py-4 font-semibold mb-8">
            + Nueva situación médica
          </button>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            Historial
          </p>

          <div className="space-y-3">
            {[
              ["Urgencias", "Dolor de barriga", "Activo"],
              ["Dentista", "Revisión general", "Cerrado"],
              ["Médico", "Dolor de garganta", "Cerrado"],
            ].map(([title, subtitle, status]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
                  </div>
                  <span className="text-xs text-emerald-300">{status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-3xl bg-white text-black p-5">
            <p className="text-sm font-semibold">Soporte LSC 24/7</p>
            <p className="text-sm text-black/60 mt-2">
              Ayuda humana limitada para situaciones importantes.
            </p>
          </div>
        </aside>

        <section className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_420px] gap-6">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 md:p-10 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 mb-8">
                  Consulta médica en curso
                </div>

                <Avatar />

                <h2 className="text-4xl md:text-7xl font-semibold tracking-tight mt-8">
                  Entiende al médico.
                </h2>

                <p className="text-gray-400 max-w-2xl mt-5 text-lg">
                  La IA escucha, simplifica y prepara la comunicación en lenguaje visual y signos.
                </p>

                <button
                  onClick={startListening}
                  className="mt-10 bg-white text-black px-10 py-5 rounded-3xl text-lg font-semibold hover:scale-[1.03] transition shadow-xl"
                >
                  Start Listening
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-44">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
                    Médico ha dicho
                  </p>
                  <p className="text-2xl leading-snug">
                    {text || "Esperando audio del médico..."}
                  </p>
                </div>

                <div className="rounded-3xl bg-white text-black p-6 min-h-44">
                  <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-4">
                    Qué hacer ahora
                  </p>
                  <p className="text-2xl font-semibold leading-snug">
                    Espera. La IA convertirá la explicación médica en pasos simples.
                  </p>
                </div>
              </div>

              <QuickReplies />
            </div>

            <aside className="rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-xl p-6 flex flex-col">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
                Resumen visual
              </p>

              <div className="space-y-4">
                <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-5">
                  <p className="text-gray-400 text-sm">Estado</p>
                  <p className="text-2xl font-semibold mt-2">Escuchando consulta</p>
                </div>

                <div className="rounded-3xl bg-white/[0.06] border border-white/10 p-5">
                  <p className="text-gray-400 text-sm">Prioridad</p>
                  <p className="text-2xl font-semibold mt-2">Comprensión clara</p>
                </div>

                <div className="rounded-3xl bg-emerald-300/10 border border-emerald-300/20 p-5">
                  <p className="text-emerald-200 text-sm">Próximo paso</p>
                  <p className="text-2xl font-semibold mt-2">
                    Mostrar instrucciones simples
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <p className="text-gray-500 text-sm">
                  Diseñado para reducir dependencia, ansiedad y confusión durante visitas médicas.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
