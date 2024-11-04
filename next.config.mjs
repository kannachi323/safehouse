/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups', // or 'same-origin-allow-popups' depending on your needs
          },
        ],
      }
    ];
  }
}

export default nextConfig;