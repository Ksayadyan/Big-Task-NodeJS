

module.exports = async (login,con)=>{
  try{
  let result = await con.query(`SELECT * FROM users WHERE login = '${login}'`, { type: con.QueryTypes.SELECT });
  return result[0]['question'];
}catch(e){
    console.log('User not found');
  }
}
