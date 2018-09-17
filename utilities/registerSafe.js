let cryptpassword = require('./cryptpassword.js')

module.exports=(req,res,con,Users)=>{
    let value=req.body;
    let password = cryptpassword(value.password);
    con.sync()
    .then (()=>{
        return (Users.create({
           name: value.firstName,
           lastname: value.lastName,
           login: value.login,
           password: password,
           gender:   value.gender,
           birthday: value.birthday,
           question: value.question,
           answer:   value.answer,
           mail:     value.email,
           phone:    value.telephone,
        })
      )
    })
    .then(()=>{
        res.send("OK");
    })
    .catch((error)=>{
        console.log("U have error");
        res.send("Duplicate")
    })
}
