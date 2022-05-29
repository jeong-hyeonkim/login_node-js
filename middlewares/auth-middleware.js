const jwt = require("jsonwebtoken");
const User = require("../models/user")

module.exports =  (req,res,next)=>{
    const {authorization} = req.headers;
    const [tokenType,tokenValue] = authorization.split(' ');
    
    if(tokenType !=='Bearer'){
        res.status(401).send({
            errorMessage:'로그인 후 사용하세요',
        });
        return;
    }

    try{
        const {userId} = jwt.verify(tokenValue,"my-secret-key");

          User.findById(userId).exec().then((user)=>{
            res.locals.user = user; //사용자 정보를 담는곳
            next(); //미들웨어는 넥스트가 무조건 있어야됨
         });//사용자가 진짜 데이터베이스에 있는지 확인
         
    } catch(err){
        res.status(401).send({errorMessage:"로그인 후 사용하세요",
    });
    return;
    }
   
};