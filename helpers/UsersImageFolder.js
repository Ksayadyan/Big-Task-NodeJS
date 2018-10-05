//creating folder for user images
const fs = require('fs');

const createFolder = (userId)=>{
    fs.mkdir(`./user-images/Client${userId}/`, (err) => {
    if (err) throw err;
    console.log("Folder created");
  })
}
  module.exports = createFolder;
