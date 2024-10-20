/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@edust/ui"],
  async rewrites() {
    return [
      {
        source: "/auth/sign-in/:path*",
        destination: "http://localhost:5173/auth/sign-in/:path*", // Vite sign-in
      },
    ];
  },
};
