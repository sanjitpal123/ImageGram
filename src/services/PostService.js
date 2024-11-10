// In services/CreatePostService.js
import { CreatePostRepo , findAllPost, findById, findPostById} from "../Repository/postRepo.js";

export const createPostService = async (createObject) => {
  const { caption, image ,user} = createObject;
  const post = await CreatePostRepo(caption, image,user);  // Await the repository call
  return post;
};
export const findAllPostService = async (offset, limit, user) => {
  console.log('Authenticated user:', user);  // Check if the user ID is correct

  const posts = await findAllPost(offset, limit);
  console.log('Fetched posts:', posts);  // Log all posts

  // Filter posts based on the user ID, ensuring both are strings
  const filted = posts.filter(post => post.user && post.user.toString() === user.toString());
  console.log('Filtered posts after user match:', filted);

  return filted;
};


export const FindByIdService=async (id, user)=>{
  const post1=await findPostById(id);
  if(post1.user!=user)
  {
    throw {
      status:401,
      message:'unauthorized'
    }

  }

  const post= await findById(id);
  return post;
}
export const FindPostById=async(id)=>{
  const post=await findPostById(id)
  return post;
}
export const UpdatePostById = async (id, updateData) => {
  const post = await UpdatePostRepo(id, updateData);
  return post;
};
