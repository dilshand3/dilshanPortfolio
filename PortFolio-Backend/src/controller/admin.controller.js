import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../model/admin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const ProfileImg = asyncHandler(async (req, res) => {
  const profileImgLocal = await req.files?.ProfileImg?.[0].path;

  if (!profileImgLocal) {
    throw new Error("Profile image is required");
  }

  const profileImg = await uploadOnCloudinary(profileImgLocal);

  // Update the admin's profile image without using user ID
  const updatedAdmin = await Admin.findOneAndUpdate({}, { ProfileImg: profileImg.url }, { new: true });
  if (!updatedAdmin) {
    throw new Error("Admin document not found");
  }

  res.status(200).json({ success: true, message: "Profile image updated successfully", data: updatedAdmin });
})

const AboutImg = asyncHandler(async (req, res) => {
  const aboutImgLocal = await req.files?.AboutImg?.[0].path;

  if (!aboutImgLocal) {
    throw new Error("About image is required");
  }
  const aboutImg = await uploadOnCloudinary(aboutImgLocal);

  // Update the admin's about image
  const updatedAdmin = await Admin.findOneAndUpdate({}, { AboutImg: aboutImg.url }, { new: true });

  if (!updatedAdmin) {
    throw new Error("Admin document not found");
  }

  res.status(200).json({ success: true, message: "About image updated successfully", data: updatedAdmin });
})

const myCV = asyncHandler(async (req, res) => {
  const myCVLocal = await req.files?.myCV?.[0].path;

  if (!myCVLocal) {
    throw new Error("My CV is required");
  }

  // Assuming uploadOnCloudinary can handle PDF files
  const myCV = await uploadOnCloudinary(myCVLocal);

  // Update the admin's CV
  const updatedAdmin = await Admin.findOneAndUpdate({}, { myCV: myCV.url }, { new: true });

  if (!updatedAdmin) {
    throw new Error("Admin document not found");
  }

  res.status(200).json({ success: true, message: "CV updated successfully", data: updatedAdmin });
})

const shareAdmin = asyncHandler(async (req, res) => {
  const shareAdmin = await Admin.find();
  res.status(200).json({ success: true, message: "Admin data fetched successfully", data: shareAdmin })
  // res.send(shareAdmin)
})

export { ProfileImg, AboutImg, myCV, shareAdmin }
