
import PostSchema from "../schema/PostSchema.js"
export const CreatePostRepo=async(caption, image,user)=>{
 try{
    const newPost=await PostSchema.create({image,caption,user})
    return newPost
 }
 catch(error)
 {
    console.log(error)
 }
}
export const findAllPost=async(offset, limit)=>{
    try{
        const posts= await PostSchema.find().skip(offset).limit(limit);
        return posts;

    }catch(error)
    {
        throw error;
    }
}
export const findById=async (id)=>{
    try{
        const post=await PostSchema.findByIdAndDelete(id)
        return post;
    }catch(error)
    {
        throw error;
    }
}
export const findPostById=async (id)=>{
    try{
        const post=await PostSchema.findById(id)
        return post;
    }
    catch(error)
    {
        throw error;
    }
}


export const UpdatePostRepo = async (id, { caption, image }) => {
  const updateFields = {};
  
  if (caption) updateFields.caption = caption;
  if (image) updateFields.image = image;

  const post = await PostModel.findByIdAndUpdate(id, updateFields, { new: true });
  return post;
};
