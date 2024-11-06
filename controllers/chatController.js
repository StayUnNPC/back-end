// controllers/chatController.js
import OpenAI from "openai";
import dotenv from 'dotenv';
import db from '../config/database.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 데이터베이스에서 태그 가져오기 함수
async function getTagsFromDatabase() {
    const [rows] = await db.query("SELECT tag_name FROM tags");
    return rows.map(row => row.tag_name).join(", ");
}

export const handleChatRequest = async (req, res) => {
    const { handColor, handShape, desiredDesign } = req.body;

    try {
        const availableTags = await getTagsFromDatabase();

        const messages = [
            {
                role: "system",
                content: `You are a creative assistant providing unique and stylish nail design tags based on user preferences. Focus on tags that highlight the user's hand color, shape, and desired design style. Generate exactly 8 creative tags that best represent a nail style, emphasizing color, shape, and design. Only use tags from this list: ${availableTags}. The first tag MUST be either "#로즈골드" or "#누드베이지" and should never be any other tag.`
            },
            {
                role: "user",
                content: `User preferences for nail recommendation: hand color - ${handColor}, hand shape - ${handShape}, desired design - ${desiredDesign}. Please respond with exactly 8 tags in Korean, each tag showcasing the color, shape, or design, and arranged in order of best match to the user preferences. For example, tags might look like #화이트 #스프라이트 #다이아몬드큐빅.`
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const tags = completion.choices[0].message.content.split(" ");
        res.json({ tags }); // 클라이언트로 태그만 전달
    } catch (error) {
        console.error("Error calling OpenAI API:", error.message);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};
