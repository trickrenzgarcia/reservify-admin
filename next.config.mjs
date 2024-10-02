/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Modify the Webpack config
    config.module.rules.push({
      test: /node-pre-gyp/,
      use: "null-loader",
    });

    // Make sure to return the config object
    return config;
  },
};

export default nextConfig;
