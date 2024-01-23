import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    // Set JWT as HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    // res.cookie allows us to set a cookie in the browser which will be sent to the server with every request and match with the JWT secret to authenticate the user. If the user is authenticated, the user will be logged in.
}

export default generateToken;