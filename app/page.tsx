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
    <main className="min-h-screen bg-black text-white flex">
      <aside className="hidden md:flex w-72 border-r border-white/10 p-6 flex-col">
        <h2 className="text-xl font-semibold mb-8">Medical Deaf</h2>

        <p className="text-xs uppercase text-gray-500 mb-3">
          Historial
        </p>

        <div className="space-y-3">
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="font-medium">Urgencias</p>
            <p className="text-sm text-gray-400">Dolor de barriga</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="font-medium">Dentista</p>
            <p className="text-sm text-gray-400">Revisión general</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="font-medium">Médico</p>
            <p className="text-sm text-gray-400">Dolor de garganta</p>
          </div>
        </div>
      </aside>

      <section className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center">
            <Avatar />

            <h1 className="text-4xl md:text-6xl font-bold mt-8 text-center">
              Medical Deaf Assistant
            </h1>

            <p className="text-gray-400 text-center max-w-xl mt-4">
              AI-first medical communication for deaf people.
            </p>

            <button
              onClick={startListening}
              className="mt-8 bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition"
            >
              Start Listening
            </button>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-black/40 border border-white/10 p-6 min-h-40">
              <p className="text-sm text-gray-500 mb-3">MÉDICO HA DICHO</p>
              <p className="text-2xl">
                {text || "Esperando audio del médico..."}
              </p>
            </div>

            <div className="rounded-3xl bg-white text-black p-6 min-h-40">
              <p className="text-sm text-black/50 mb-3">QUÉ HACER AHORA</p>
              <p className="text-2xl font-semibold">
                Espera. Escucha. La IA te dará los siguientes pasos.
              </p>
            </div>
          </div>

          <QuickReplies />
        </div>
      </section>
    </main>
  );
}
