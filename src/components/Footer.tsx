
'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16 py-8 text-center text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} <span className="font-semibold">Multilingual AI Blog Generator</span>. Built with 💡 using Next.js.
      </p>
    </footer>
  );
}
