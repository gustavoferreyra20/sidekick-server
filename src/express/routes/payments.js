const axios = require('axios');
const sequelize = require('../../sequelize');

async function createMp(req, res) {
    try {
        const body = {
            items: [
                {
                        id: req.body.id_reward,
                        title: req.body.name,
                        description: req.body.description,
                        picture_url: 'https://sidekick-server-nine.vercel.app/api/images/' + req.body.img,
                        category_id: 'reward',
                        quantity: 1,
                        unit_price: req.body.price
                    }                ],
            notification_url: `${process.env.SERVER}/payments/webhook`,
            metadata: {
                id_user: req.body.id_user,
            },

        };

        const response = await axios.post(
            'https://api.mercadopago.com/checkout/preferences',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
}

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
        
        console.log('Webhook validation successful:', { resource: body.resource, topic: body.topic });
        
        // Call getPaymentFromApi with the resource ID
        const paymentData = await getPaymentFromApi(body.resource);
        console.log('Payment data retrieved:', paymentData);
        
        // Process approved payment
        await processApprovedPayment(paymentData);
        
        return paymentData;
    } catch (error) {
        console.error('Error in validateAndProcessPayment:', error.message);
        // Don't throw error, just log it and return
        return;
    }
}

async function receivePayment(req, res) {
    try {
        // Validate the notification received from Mercado Pago
        // Ensure it's a valid notification from Mercado Pago to prevent fraud

        const notification = req.body;
        console.log('Received webhook notification:', notification);

        // Validate and process the payment
        await validateAndProcessPayment(notification);

        // Respond with a 200 OK to acknowledge receipt of the notification
        res.status(200).end();
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).end(); // Respond with an error status code
    }
}

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

async function processApprovedPayment(paymentData) {
    try {
        // Check if payment status is approved
        if (!paymentData || paymentData.status !== 'approved') {
            console.log('Payment not approved, skipping reward processing. Status:', paymentData?.status);
            return;
        }

        // Extract reward ID and user ID from payment data
        const rewardId = paymentData.additional_info?.items?.[0]?.id;
        const userId = paymentData.metadata?.id_user;

        if (!rewardId || !userId) {
            console.log('Missing reward ID or user ID in payment data:', { rewardId, userId });
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
            console.log('Reward amount incremented for user:', { userId, rewardId, newAmount: existingReward.amount + 1 });
        } else {
            // If reward doesn't exist, create new entry
            await UsersRewards.create({
                id_user: userId,
                id_reward: rewardId,
                amount: 1
            });
            console.log('New reward added to user:', { userId, rewardId, amount: 1 });
        }

    } catch (error) {
        console.error('Error processing approved payment:', error.message);
        // Don't throw error to avoid breaking the webhook response
    }
}

module.exports = {
    createMp: createMp,
    receivePayment: receivePayment,
    getPaymentFromApi: getPaymentFromApi,
    validateAndProcessPayment: validateAndProcessPayment,
    processApprovedPayment: processApprovedPayment
};