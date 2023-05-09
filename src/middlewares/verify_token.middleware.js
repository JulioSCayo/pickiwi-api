import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config.js';

export const verifyToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return res.status(401).json({
            error: true,
            message: "No autorizado",
        });
    }

    const authHeader = req.headers["authorization"];
    const bearer = authHeader.split(" ");
    const token = bearer[1] || null;

    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Token vacío",
        });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = {_id: payload._id, username: payload.username, email: payload.email};
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Token no válido.",
        });
    }
};