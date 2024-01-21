function handleAsyncErrors(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error caught by handleAsyncErrors:', error);

            // Send the full error response, including status code and other details
            res.status(500).json({
                error: {
                    message: 'Internal Server Error',
                    status: 500,
                    stack: error.stack,  // Include the stack trace for debugging (optional)
                },
            });
        }
    };
}

module.exports = { handleAsyncErrors };