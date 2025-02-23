/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MSAL_CLIENT_ID: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
    NEXT_PUBLIC_MSAL_TENANT_ID: process.env.NEXT_PUBLIC_MSAL_TENANT_ID,
    NEXT_PUBLIC_MSAL_REDIRECT_URI: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI,
    NEXT_PUBLIC_MSAL_SCOPE: process.env.NEXT_PUBLIC_MSAL_SCOPE,
  },
};

export default nextConfig;
