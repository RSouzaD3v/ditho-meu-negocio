import React from "react";

export default function FerramentasPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center">
                <svg
                    className="w-20 h-20 text-blue-400 mb-6 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 48 48"
                >
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" />
                    <path
                        d="M16 24h16M24 16v16"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Página em desenvolvimento
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Estamos trabalhando para trazer novas ferramentas para você.<br />
                    Volte em breve para novidades!
                </p>
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    Dashboard &gt; Ferramentas
                </span>
            </div>
        </div>
    );
}