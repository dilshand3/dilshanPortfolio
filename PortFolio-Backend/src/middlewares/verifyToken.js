import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) => {
    const token = req.cookies.token;
   
    if (!token) {
        return res.status(401).json({succes : false,message : "UnAuthorized- no token provided"})
    }
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({succes : false,message : "Unauthorized- invalid token"})
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log("Error in verifyToken",error);
        return res.status(500).json({success : false, message : "Server error"})
    }
}