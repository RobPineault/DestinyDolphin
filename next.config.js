const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                options: { mode: ['react-component'] }
            }
        )
        return cfg;
    }
}

module.exports = withBundleAnalyzer(nextConfig)