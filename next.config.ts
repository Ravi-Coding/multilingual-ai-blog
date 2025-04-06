import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 👈 Enable static HTML export
  images: {
    unoptimized: true, // 👈 Necessary for Next.js static export if using <Image />
  },
};

export default nextConfig;
