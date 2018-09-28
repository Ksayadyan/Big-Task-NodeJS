//Class for making new User Object(mongodb)
module.exports = class{
  constructor(id,path){
    this.id = id;
    this.history = {};
    this.totalFetched = 0;
    this.images = [];
    this.totalImages = 0;
    this.profileImage = path;
  }
};
