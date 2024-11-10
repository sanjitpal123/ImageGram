import jwt from 'jsonwebtoken';

// Function to generate JWT
export const genereToken = (payload) => {
  return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
};

export const verifyJwt = (token) => {
  const secret = process.env.JWT_SECRET; // Make sure your secret is set in environment variables
  return jwt.verify(token, secret);
};