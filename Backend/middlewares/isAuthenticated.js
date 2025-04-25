import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // ✅ Corrected typo

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // ❌ Removed unnecessary `await`

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decoded.userId; // ✅ Attaching userId correctly
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            success: false 
        }); // ✅ Return response to avoid request hanging
    }
};

export default isAuthenticated;