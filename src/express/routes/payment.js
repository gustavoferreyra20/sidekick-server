const axios = require('axios');

async function create(req, res) {
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
            notification_url: 'https://yourserver.com/payment/notification' // Set your notification URL
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

        res.json({ init_point: response.data.init_point });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
}

module.exports = {
    create: create,
};