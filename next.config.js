const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
// const backendUrl = "http://localhost:3000";

console.log(backendUrl);

module.exports = {
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: backendUrl + "/:path*",
            },
        ];
    },
};
