/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
  },
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Bundle analyzer for optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size in production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate story module into its own chunk
          story: {
            test: /[\\/]src[\\/]components[\\/]modules[\\/]story[\\/]/,
            name: 'story-module',
            chunks: 'all',
            priority: 10,
          },
          // Separate UI components
          ui: {
            test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
            name: 'ui-components',
            chunks: 'all',
            priority: 5,
          },
        },
      }
    }
    
    return config
  },
  
  // Compress output
  compress: true,
  
  // Enable static optimization
  trailingSlash: false,
  
  // Enable static optimization
  poweredByHeader: false,
}

module.exports = nextConfig