

'use client';
import { useState } from 'react';
import BlogForm from '@/components/BlogForm';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  const [blog, setBlog] = useState('');
  const [translated, setTranslated] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prompt: string, lang: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, language: lang }),
      });

      const data = await res.json();
      console.log('Data received from /generate:', data);

      setBlog(data.original || '');
      setTranslated(data.translated || '');
    } catch (error) {
      console.error('Frontend Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center px-4 pt-10 pb-4 min-h-[70vh]">
  <div className="w-full max-w-4xl space-y-8">
    <BlogForm
      onGenerate={handleGenerate}
      loading={loading}
      language={language}
      setLanguage={setLanguage}
    />
    {(blog || translated) && <BlogCard content={blog} />}
  </div>
</section>
  );
}

