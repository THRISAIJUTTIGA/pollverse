import jwt from "jsonwebtoken";
export function optionalAuth(req,_res,next){const token=req.cookies?.accessToken; if(token) try{req.user=jwt.verify(token,process.env.JWT_SECRET||"dev-secret");}catch{} next();}
export function auth(req,res,next){optionalAuth(req,res,()=>req.user?next():res.status(401).json({message:"Authentication required"}));}
export function issueToken(payload){return jwt.sign(payload,process.env.JWT_SECRET||"dev-secret",{expiresIn:"15m"});}
