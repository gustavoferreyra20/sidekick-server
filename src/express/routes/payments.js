const axios = require('axios');

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
            throw new Error('Invalid webhook body: body is missing or not an object');
        }
        
        if (!body.resource) {
            throw new Error('Invalid webhook body: resource is missing');
        }
        
        if (body.topic !== 'payment') {
            throw new Error(`Invalid webhook body: expected topic 'payment', got '${body.topic}'`);
        }
        
        console.log('Webhook validation successful:', { resource: body.resource, topic: body.topic });
        
        // Call getPaymentFromApi with the resource ID
        const paymentData = await getPaymentFromApi(body.resource);
        console.log('Payment data retrieved:', paymentData);
        
        return paymentData;
    } catch (error) {
        console.error('Error in validateAndProcessPayment:', error.message);
        throw error;
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

module.exports = {
    createMp: createMp,
    receivePayment: receivePayment,
    getPaymentFromApi: getPaymentFromApi,
    validateAndProcessPayment: validateAndProcessPayment
};