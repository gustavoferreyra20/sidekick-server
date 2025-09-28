const axios = require('axios');
const { validateAndProcessPayment } = require('../services/paymentService');

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

async function receivePayment(req, res) {
    try {
        const notification = req.body;
        console.log('Received webhook notification:', notification);

        // Respond with 200 OK immediately to acknowledge receipt
        res.status(200).end();

        // Process the payment asynchronously (fire and forget)
        // This ensures MercadoPago gets a quick response
        validateAndProcessPayment(notification)
            .catch(error => {
                console.error('Error processing webhook asynchronously:', error);
                // Log error but don't throw since response already sent
            });

    } catch (error) {
        console.error('Error handling webhook:', error);
        // If we haven't responded yet, send error response
        if (!res.headersSent) {
            res.status(500).end();
        }
    }
}

module.exports = {
    createMp: createMp,
    receivePayment: receivePayment
};