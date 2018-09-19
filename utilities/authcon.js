module.exports = async (con) => {
  try {
    await con.authenticate()
    console.log('Connected to database');
  } catch (e) {
    throw new Error('Unable to connect to database');
  }
}
