

'use client';

import { useState } from 'react';

interface BlogFormProps {
  onGenerate: (prompt: string, lang: string) => void;
  loading: boolean;
  language: string;
  setLanguage: (lang: string) => void;
}

export default function BlogForm({ onGenerate, loading, language, setLanguage }: BlogFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt, language);
    setPrompt(''); // 🧼 Clear the textarea after submit
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-3 bg-white p-6 rounded-2xl shadow-md"
    >
      <textarea
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none text-base"
        placeholder="Enter your blog topic..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full sm:w-auto p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-xl shadow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Blog'}
        </button>
      </div>
    </form>
  );
}
