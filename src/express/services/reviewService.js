/**
 * Service for handling review-related operations
 */
const { getUserLastReviews } = require('../routes/users');
const { generateReviewFromComments } = require('./genAIService');
const { models } = require('../../sequelize/index');

/**
 * Calls Google Gemini API to generate an AI review
 * @param {Array} reviews - Array of review objects with comments
 * @returns {String} Generated AI review
 */
async function generateAIReview(reviews) {
    try {
        const comments = reviews.map(review => review.comment).filter(comment => comment && comment.trim());
        
        return await generateReviewFromComments(comments);

    } catch (error) {
        console.error('Error generating AI review:', error.message);
        return 'Unable to generate AI review at this time.';
    }
}

/**
 * Updates AI review asynchronously
 * @param {number} userId - The ID of the user who created the review
 */
async function updateAIReview(userId) {
    try {
        // Get the last 5 reviews for the user
        const lastReviews = await getUserLastReviews(userId);
        
        console.log('Updating AI review for user ID:', userId);
        console.log(`Found ${lastReviews.length} reviews with comments`);
        
        if (lastReviews.length > 0) {
            // Check if user has AI review feature enabled
            const userAIReviewSetting = await models.user_ai_review.findOne({
                where: { id_user: userId }
            });
            
            // Only skip AI review generation if user has explicitly disabled it
            if (userAIReviewSetting && !userAIReviewSetting.show) {
                console.log(`AI review generation skipped for user ${userId} - feature disabled`);
                return;
            }
            
            // Generate AI review using GenAI service
            const aiGeneratedReview = await generateAIReview(lastReviews);
            
            console.log('Generated AI Review:', aiGeneratedReview);
            
            // Save the AI review to the user_ai_review table
            try {
                await models.user_ai_review.upsert({
                    id_user: userId,
                    ai_review: aiGeneratedReview,
                    show: true
                });
                console.log(`AI review saved to user_ai_review table for user ${userId}`);
            } catch (dbError) {
                console.error('Error saving AI review to user_ai_review table:', dbError.message);
            }
            
        } else {
            console.log('No reviews with comments found for AI analysis');
        }
        
    } catch (error) {
        console.error('Error updating AI review:', error);
        // Handle error silently since this is a fire-and-forget operation
    }
}

module.exports = {
    updateAIReview,
    generateAIReview
};