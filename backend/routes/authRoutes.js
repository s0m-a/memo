import express from 'express';
import AuthController from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', AuthController.signUp);
router.post('/login', AuthController.logIn);
router.post('/logout', AuthController.logOut);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.cookies || {}; 
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, AuthController.REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Invalid refresh token', err);
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.sendStatus(403);
        }
        const accessToken = AuthController.generateToken(decoded.id).accesstoken;
        
        // Set the new access token as a cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1 * 60 * 60 * 1000,
        });

        res.json({ status: "success", message: "Token refreshed" });
    });
});

export default router;
