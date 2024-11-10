import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    }
    )
   await res.cookie("token", token, {
        httpOnly: true,
        secure:true,
        sameSite: "None",
        maxAge: 7 * 20 * 60 * 60 * 1000
    })
    return token
}