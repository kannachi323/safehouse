/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/(.*)', // Apply CORS headers only to API routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Allow all origins (change '*' to a specific domain in production for security)
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS', // Allow specific HTTP methods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization', // Allow specific headers
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true', // Include credentials (cookies, authorization headers, etc.)
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'crendtialless', // Optional, add if you need COEP (Cross-Origin Embedder Policy)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
