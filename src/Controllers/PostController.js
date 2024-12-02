import cloudinary from "../config/Cloudinary.js";  // Ensure this is configured correctly
import fs from 'fs';  // To delete the local file after upload
import { createPostService, FindByIdService } from "../services/PostService.js";
import { findAllPostService } from "../services/PostService.js"; 
async function CreatePost(req, res) {
  try {
    // Ensure that both file and caption are provided
    const userDetail=req.user;
    console.log('user',userDetail);
    if (!req.file || !req.body.caption) {
      return res.status(400).json({
        message: "Image and caption are required",
      });
    }

    // Upload the image file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "MVC", // Optional: specify a folder in Cloudinary
    });

    // Remove the local file after upload to Cloudinary to save space
    fs.unlinkSync(req.file.path);

    // Prepare the post object
    const newPost = {
      caption: req.body.caption,
      image: uploadResult.secure_url, 
      user:userDetail._id// Cloudinary URL
    };

    // Call the service to create the post in MongoDB
    const createdPost = await createPostService(newPost);

    // Respond with the created post
    res.status(201).json({
      message: "Post created successfully",
      post: createdPost,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
}

export default CreatePost;
export const GetAllPost = async (req, res) => {
  try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      console.log('Authenticated user ID:', req.user._id);  // Log authenticated user ID

      const posts = await findAllPostService(offset, limit, req.user._id);

      return res.status(200).json({
          success: true,
          posts,
      });
  } catch (error) {
      console.error('Error:', error);
      return res.status(501).json({
          success: false,
          message: 'Internal server error',
      });
  }
};


export const DeleteById=async (req,res)=>{
  try{
    
     const id=req.params.id;
     const post=await FindByIdService(id, req.user._id);
     return res.status(201).json({
      success:true,
      message:'Deleted successfully',
      post
     })
  }catch(error)
  {
    return res.status(501).json({
      success:false,
      message:'Internal server error'
    })
  }
}
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { caption } = req.body;
    const image = req.file ? req.file.path : null;

    const post = await UpdatePostById(postId, { caption, image });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

