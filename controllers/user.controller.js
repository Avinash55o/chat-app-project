import { myError } from "@/utils/myError";
import { myResponse } from "@/utils/myResponse";
import { User } from "@/models/user.models";
import { upload } from "@/api/middleware/multer.middleware";

const registerUser = async (req, res) => {
  const { fullname, email, name, password } = req.body;

  // To check all fields are their or not and to ensure that the fields are not just non-empty but also not just white space i use trim()
  if ([fullname, email, name, password].some((field) => field?.trim() === "")) {
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

};
