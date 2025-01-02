// app/lib/appwrite/config.ts
import { Client } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Only set API key in non-browser environment
if (typeof window === 'undefined' && process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
}

export default client;