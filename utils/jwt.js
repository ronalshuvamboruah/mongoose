const jwt = require('jsonwebtoken');



const loginUsers=(req,res,next)=>{

}




const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports=authenticateUser