const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const API = {
  CHAT: `${BASE_URL}/api/chat`,
  QUOTA: `${BASE_URL}/api/quota`,
};
