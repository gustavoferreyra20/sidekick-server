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
            back_urls: {
                // declaramos las urls de redireccionamiento
                success: `/success`,
                // url a la que va a redireccionar si sale todo bien
                pending: `/pending`,
                // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
                failure: `/error`
                // url a la que va a redireccionar si falla el pago
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

        res.json({ init_point: response.data.init_point });
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

        // Process the notification
        if (notification.action === 'payment.created') {
            // Handle payment created event
            // This event is triggered when a payment is created

            // You may want to update your database or perform other actions here
            // For example, mark the corresponding order as pending

            console.log('Payment created:', notification.data);
        } else if (notification.action === 'payment.updated') {
            // Handle payment updated event
            // This event is triggered when the payment status is updated

            // Check if the payment status is approved
            if (notification.data.status === 'approved') {
                // Payment was successful, update your database or perform other actions
                // For example, mark the corresponding order as paid

                console.log('Payment approved:', notification.data);
            }
        }

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