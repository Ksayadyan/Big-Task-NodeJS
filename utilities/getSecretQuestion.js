

module.exports = async (login,con)=>{
  let result = await con.query(`SELECT * FROM users WHERE login = '${login}'`, { type: con.QueryTypes.SELECT });
  return result[0]['question'];
}
