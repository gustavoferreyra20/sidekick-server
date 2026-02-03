/**
 * Service for handling Google GenAI operations
 */
const { GoogleGenAI } = require('@google/genai');

// Initialize Google GenAI client
const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY
});

/**
 * Generates text content using Google GenAI
 * @param {string} prompt - The prompt to send to the AI
 * @param {string} model - The model to use (default: gemini-flash-latest)
 * @returns {string} Generated text content
 */
async function generateContent(prompt, model = 'gemini-flash-latest') {
    try {
        const response = await genAI.models.generateContent({
            model: model,
            contents: prompt
        });

        return response.text;

    } catch (error) {
        console.error('Error generating content with GenAI:', error.message);
        throw new Error('Unable to generate content at this time.');
    }
}

/**
 * Generates an AI review based on user comments
 * @param {Array} comments - Array of comment strings
 * @returns {string} Generated AI review
 */
async function generateReviewFromComments(comments) {
    try {
        if (!comments || comments.length === 0) {
            return 'No sufficient review data available for AI analysis.';
        }

        const filteredComments = comments.filter(comment => comment && comment.trim());
        
        if (filteredComments.length === 0) {
            return 'No sufficient review data available for AI analysis.';
        }

        const prompt = `Based on these user reviews: ${filteredComments.join('; ')}, generate a comprehensive AI review that summarizes the common themes, highlights key points, and provides an overall assessment. Make it concise, natural and helpful for other users. Limit to 150 characters. The language should be spanish. 

IMPORTANT TONE GUIDELINES:
- If the reviews contain negative feedback, transform it into constructive, friendly, and humorous suggestions
- Avoid harsh words, insults, or offensive language
- Use playful and lighthearted language when addressing weaknesses
- Focus on potential for improvement rather than criticism
- Make negative points sound like friendly advice between gaming buddies

IMPORTANT: Respond ONLY with a valid JSON object in this exact format:
{
  "message": "your review message here"
}

Do not include any other text, explanations, or markdown formatting.`;

        const aiResponse = await generateContent(prompt);
        
        // Parse JSON response and extract message
        try {
            const jsonResponse = JSON.parse(aiResponse.trim());
            return jsonResponse.message || aiResponse;
        } catch (parseError) {
            console.error('Failed to parse AI JSON response:', parseError.message);
            // Return the raw response if JSON parsing fails
            return aiResponse.substring(0, 200); // Truncate to fit DB column
        }

    } catch (error) {
        console.error('Error generating review from comments:', error.message);
        return 'Unable to generate AI review at this time.';
    }
}

module.exports = {
    generateContent,
    generateReviewFromComments
};