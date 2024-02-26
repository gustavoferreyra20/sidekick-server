const axios = require('axios');

async function createMp(req, res) {
    try {
        const body = {
            items: [
                {
                    title: req.body.name,
                    description: req.body.description,
                    picture_url: 'http://www.myapp.com/myimage.jpg',
                    category_id: 'reward',
                    quantity: 1,
                    unit_price: req.body.price
                }
            ],
            back_urls: {},
            notification_url: `${process.env.SERVER}/payments/webhook`,
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
        // Validate the notification received from Mercado Pago
        // Ensure it's a valid notification from Mercado Pago to prevent fraud

        const notification = req.body;

        console.log(req)

        // Respond with a 200 OK to acknowledge receipt of the notification
        res.status(200).end();
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).end(); // Respond with an error status code
    }
}

module.exports = {
    createMp: createMp,
    receivePayment: receivePayment
};