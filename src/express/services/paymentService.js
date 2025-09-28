const axios = require('axios');
const sequelize = require('../../sequelize');

/**
 * Fetches payment data from MercadoPago API
 * @param {string} paymentId - The payment ID to fetch
 * @returns {Object} Payment data from MercadoPago
 */
async function getPaymentFromApi(paymentId) {
    try {
        if (!paymentId) {
            throw new Error('Payment ID is required');
        }

        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${paymentId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error getting payment from MercadoPago API:', error);
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(`MercadoPago API error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response from MercadoPago API');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`MercadoPago API request failed: ${error.message}`);
        }
    }
}

/**
 * Processes approved payments and adds rewards to users
 * @param {Object} paymentData - Payment data from MercadoPago
 */
async function processApprovedPayment(paymentData) {
    try {
        // Check if payment status is approved
        if (!paymentData || paymentData.status !== 'approved') {
            return;
        }

        // Extract reward ID and user ID from payment data
        const rewardId = paymentData.additional_info?.items?.[0]?.id;
        const userId = paymentData.metadata?.id_user;

        if (!rewardId || !userId) {
            return;
        }

        console.log('Processing approved payment:', { userId, rewardId, paymentId: paymentData.id });

        // Get the users_rewards model
        const UsersRewards = sequelize.models.users_rewards;

        // Check if the user already has this reward
        const existingReward = await UsersRewards.findOne({
            where: {
                id_user: userId,
                id_reward: rewardId
            }
        });

        if (existingReward) {
            // If reward exists, increment the amount
            await existingReward.update({
                amount: existingReward.amount + 1
            });
        } else {
            // If reward doesn't exist, create new entry
            await UsersRewards.create({
                id_user: userId,
                id_reward: rewardId,
                amount: 1
            });
        }

    } catch (error) {
        console.error('Error processing approved payment:', error.message);
        // Don't throw error to avoid breaking the webhook response
    }
}

/**
 * Validates webhook body and processes payment if valid
 * @param {Object} body - Webhook request body
 * @returns {Object|undefined} Payment data if processed successfully
 */
async function validateAndProcessPayment(body) {
    try {
        // Validate that the body contains the required structure
        if (!body || typeof body !== 'object') {
            return;
        }
        
        if (!body.resource) {
            return;
        }
        
        if (body.topic !== 'payment') {
            return;
        }
                
        // Call getPaymentFromApi with the resource ID
        const paymentData = await getPaymentFromApi(body.resource);
        // Process approved payment
        await processApprovedPayment(paymentData);
        
        return paymentData;
    } catch (error) {
        console.error('Error in validateAndProcessPayment:', error.message);
        // Don't throw error, just log it and return
        return;
    }
}

module.exports = {
    getPaymentFromApi,
    processApprovedPayment,
    validateAndProcessPayment
};