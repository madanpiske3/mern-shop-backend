const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') return res.status(401).json({ message: 'The user is not authorized' })
    if (err.name === 'ValidationError') return res.status(401).json({ message: err }) 

    // if (err) {
    //     console.log('error handler called');
    //     res.status(500).json({ message: err.message || 'Internal Server Error' });
    // } else {
    //     next();
    // }
    return res.status(500).json(err);
}

export default errorHandler;