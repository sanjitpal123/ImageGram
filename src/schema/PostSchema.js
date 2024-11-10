// models/PostSchema.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: String,
   // Make sure image is required
  },
  caption: {
    type: String,
    required: true,  // Make sure caption is required
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});

const PostSchema = mongoose.model("Post", postSchema);
export default PostSchema;
