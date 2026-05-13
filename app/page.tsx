"use client";

import { useState } from "react";

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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Medical Deaf Assistant
      </h1>

      <p className="text-gray-300 text-center max-w-xl mb-10">
        Real-time medical subtitles for deaf people.
      </p>

      <button
        onClick={startListening}
        className="bg-white text-black px-6 py-3 rounded-2xl text-lg font-semibold hover:scale-105 transition"
      >
        Start Listening
      </button>

      <div className="mt-10 text-2xl text-center max-w-2xl">
        {text}
      </div>
    </main>
  );
}