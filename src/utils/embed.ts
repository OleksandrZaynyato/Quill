import {OpenAI} from "openai";

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Not Loaded');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function embed(text: string) {
    const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });
    return res.data[0].embedding;
}