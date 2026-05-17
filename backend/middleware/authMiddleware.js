// middleware/authMiddleware.js
import  jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY

const authenticateJWT = (req, res, next) => {
    // Check for token in Authorization header or in cookies
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.accessToken;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Authentication error:', err.message);
                const status = err.name === 'TokenExpiredError' ? 401 : 403;
                return res.status(status).json({ 
                    status: 'error', 
                    message: err.name === 'TokenExpiredError' ? "Session expired" : "Invalid token" 
                });
            }
            req.user = decoded;
            next();
        });
    } else {
        console.error('No token provided');
        return res.status(401).json({ status: 'error', message: "Authentication required" });
    }
};

export default authenticateJWT;
