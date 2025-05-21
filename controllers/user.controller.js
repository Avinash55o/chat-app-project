import { myError } from "@/utils/myError";
import { myResponse } from "@/utils/myResponse";
import { User } from "@/models/user.models";
import { uploadToCloudinay } from "@/utils/cloudinary";

const registerUser = async (req, res) => {
  const { fullName, email, name, password } = req.body;

  // To check all fields are their or not and to ensure that the fields are not just non-empty but also not just white space i use trim()
  if ([fullName, email, name, password].some((field) => field?.trim() === "")) {
    throw new myError(400, "all field are required");
  }

  // check if user already exists
  const existingUser= await User.findOne({
    $or:[{name}, {email}]
  });
  
  if(existingUser){
    throw new myError(409, "the user already exists")
  };

  // to access the file path of the uploaded avatar through multer.
  const avatarLocalPath = req.files?.avatar[0]?.path;

  // if avatar local path empty
  if(!avatarLocalPath){
    throw new myError(400, "avatar local path is not available")
  }

  // upload to the cloudinary
  const avatar= await uploadToCloudinay(avatarLocalPath);

  if(!avatar){
    throw new myError(400, "something happens when uploading avatar to cloudinary")
  }

  // creating new user
  const user= await User.create({
    name,
    fullName,
    email,
    password,
    avatar: avatar.url
  })

  //In response i dont want to give the password and refreshToken
  const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser){
    throw new myError(500, "created user logic have some problem")
  };

  // return the res
  return res.status(201).myResponse(201,createdUser,"the user is registerd successfully")
};

