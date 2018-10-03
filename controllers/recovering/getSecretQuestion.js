//Get secret question for given login

module.exports = async (login,con)=>{
  try{
  const query = `SELECT question FROM users WHERE login = '${login}'`; //SQL query
  const result = await con.query(query, { type: con.QueryTypes.SELECT }); //Result after SQL query
  return result[0]['question'];
}catch(e){
    console.log('User not found');
  }
}
