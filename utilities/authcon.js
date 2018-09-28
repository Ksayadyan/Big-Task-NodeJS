//Module for chekcing the connection between Nodejs Server
//and MySQL database

module.exports = async (con) => {
  try {
    await con.authenticate();
    console.log('Connected to database');
  } catch (e) {
    throw new Error('Unable to connect to database');
  }
}
