const jwt = require("jsonwebtoken")
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
module.exports = function (req, res, next) {
    //get authcookie from request
    const authcookie = req.cookies.authcookie
    try{
        console.log("Reached check Token")
        jwt.verify(authcookie,JWT_SECRET,(err,data)=>{
            if(err){
                console.log("error")
              res.sendStatus(403)
            } 
            else if(data.id){
               console.log("token verify success")
             req.user = data.id
              next()
           }
       })

    }
    catch(e){
        console.error(e)
    }
    //verify token which is in cookie value
}
