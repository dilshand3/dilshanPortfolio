import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "../email/Email.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const SignUp = asyncHandler(async(req,res) => {
    const {username,email,number,password,isAdmin} = req.body;
    if (!username || !email || !number || !password) {
        throw new Error("All fields are required"); 
    }
  
    const existedUser = await User.findOne({
        $or : [{email},{number}]
    });

    if (existedUser && !existedUser.isVerified) {
        await User.deleteOne({ _id: existedUser._id });
    } else if (existedUser) {
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const VerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const user = new User({
        username,
        email,
        number,
        password : hashPassword,
        isAdmin,
        VerificationCode,
        VerificationCodeExpiry : Date.now() + 2 * 60 * 60 * 1000
    })

    await user.save();
    await sendVerificationEmail(user.email,VerificationCode,user.username);
    const createdUser = await User.findById(user._id).select("-password -VerificationCodeExpiry").lean().exec();
   
    res.status(200).json({success: true, message: "User created successfully", data: createdUser})
}) 

const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body;

        const user = await User.findOne({
            VerificationCode: code,
            VerificationCodeExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code",
                user
            })
        }

        user.isVerified = true;
        user.VerificationCode = undefined,
        user.VerificationCodeExpiry = undefined;
        generateTokenAndSetCookie(res, user._id);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
}) 

const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email,
        isVerified : true
     });
		if (!user) {
			return res.status(400).json({ success: false, message: "user didn't exist" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid password" });
		}

	     await generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
})

const logout = async (req, res) => {
    res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
}

const checkAuth = asyncHandler(async (req,res) => {
    const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({success : false,message : "User not found"})
        }

        return res.status(200).json({success : true,user})
})

const shareVerifyUser = asyncHandler(async(req,res) => {
    const AllUser = await User.find({
        isVerified : true
    });
    res.status(200).send(AllUser)
})

const shareNonVerifyUser = asyncHandler(async (req,res) => {
    const AllUser = await User.find({
        isVerified : false
    })

    res.status(200).send(AllUser)
})

export { SignUp,verifyEmail,login,logout,checkAuth,shareVerifyUser,shareNonVerifyUser }