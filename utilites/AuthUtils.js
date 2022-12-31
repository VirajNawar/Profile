const validator = require("validator")

const validate = ({name,email,username,password}) =>{
    return new Promise((resolve, reject)=>{
      if(typeof email != "string") reject("Invalid Email Id")
      if(typeof name != "string") reject("Invalid name")
      if(typeof password != "string") reject("Invalid Password")
      if(typeof username != "string") reject("Invalid User Name")
  
      if(!email || !password || !username) reject("Invalid Data")
  
      if(!validator.isEmail(email)) reject("Invalid Email Format")
  
      if(username.length < 3) reject("User Name too short")
      if(username.length > 50) reject("User Name too long")
  
      if(password.length < 5) reject("Password too short")
      if(password.length > 30) reject("User Name too long")
  
      resolve()
    })
  }

  module.exports = {validate}