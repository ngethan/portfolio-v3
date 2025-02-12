import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/photos",
                destination: "https://www.instagram.com/ethn.raw/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;

/*
export default MillionLint.next({
    enabled: true,
    rsc: true
})(nextConfig);
*/
