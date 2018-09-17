module.exports=(con)=>{
    con.authenticate()
    .then (()=>{
     console.log("Connected to database");
    //  return true
     
    })
    .catch((e)=>{
        throw new Error ("Unable to connect to database");
    })
}