//Module for checking the connection between Nodejs Server and MySQL database

module.exports = async (connection) => {
  try {
    await connection.authenticate();
    console.log('Connected to database');
  } catch (e) {
    throw new Error('Unable to connect to database');
  }
}
