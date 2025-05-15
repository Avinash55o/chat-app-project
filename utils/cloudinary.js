import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


//configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//Logic to upload an image
const uploadToCloudinay= async (localFilePath)=>{
  try {
    //Console.log("file is here to upload to cloudinary",localFilePath);

    if(!localFilePath) return null;
   
    // uploading the image
    const response= await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto"
    });

    return response

  } catch (error) {
    // Delete the file from the server(temp)
    fs.unlinkSync(localFilePath)
    return null;
  }
}

export {uploadToCloudinay};