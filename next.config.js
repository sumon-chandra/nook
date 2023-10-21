/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        domains: [
            "res.cloundinary.com",
            "avatars.githubsercontent.com",
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig
