const jwt = require("jsonwebtoken");
const { cookieParser } = require("../helpers/cookieParser");

exports.JWTController = {
  createToken(payload, refresh = false) {
    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 30,
    });

    return {
      access_token: accessToken,
      refresh_token: refresh
        ? jwt.sign(payload, process.env.SECRET, {
            expiresIn: 30 * 24 * 60 * 60,
          })
        : null,
    };
  },

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (e) {
      return false;
    }
  },

  verifyAccessToken(req, res, next)
  {
     const headers = req.headers
     if(!headers['authorization'])
     res.status(405).json({message: "token not provided"})

    
     const token = headers['authorization'].split(" ")[1]

     if(!this.verifyToken(token))
     res.status(405).json({message: "invalid token"})

     else 
     next()
  },

  grantNewAccessToken(req, res)
  {
    const token = cookieParser("refresh_token", req.headers.cookie)
    let decoded = this.verifyToken(token)
    if(!decoded)
    res.status(405).json({message: "invalid token"})

    else {
        console.log(decoded)
        let newToken = this.createToken({email:decoded.email}, false)
        res.send({access_token: newToken.access_token})
    }
    
  }


};
