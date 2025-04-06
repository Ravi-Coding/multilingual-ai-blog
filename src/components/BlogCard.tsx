
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Download, Share2 } from 'lucide-react';

interface BlogCardProps {
  content: string;
}

export default function BlogCard({ content }: BlogCardProps) {
  const [copied, setCopied] = useState(false);
  const blogRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default as () => {
        from: (element: HTMLElement) => {
          save: (filename?: string) => void;
        };
      };
      
      if (blogRef.current) {
        html2pdf().from(blogRef.current).save('blog.pdf');
      }
    }
  };
  

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated Blog',
          text: content.slice(0, 100) + '...',
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 w-full max-w-3xl mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-white p-6 sm:p-8 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
          ✨ Generated Blog
        </h2>

        <div className="flex space-x-3">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl hover:bg-indigo-100 transition"
            title="Copy to clipboard"
          >
            <ClipboardCheck className="w-5 h-5 text-indigo-600" />
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-xl hover:bg-green-100 transition"
            title="Download as PDF"
          >
            <Download className="w-5 h-5 text-green-600" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl hover:bg-pink-100 transition"
            title="Share blog"
          >
            <Share2 className="w-5 h-5 text-pink-600" />
          </button>
        </div>
      </div>

      <div
        ref={blogRef}
        className="text-gray-800 text-base leading-relaxed whitespace-pre-line bg-white/70 rounded-xl px-4 py-3"
      >
        {content || 'No content generated.'}
      </div>

      {copied && (
        <p className="text-sm text-green-600 mt-2 transition-opacity duration-300">
          ✅ Copied to clipboard!
        </p>
      )}
    </motion.div>
  );
}
