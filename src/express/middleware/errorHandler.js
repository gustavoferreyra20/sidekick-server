function handleAsyncErrors(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };
}

module.exports = { handleAsyncErrors };