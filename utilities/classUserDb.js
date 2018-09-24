

module.exports = class User{
  constructor(id){
    this.id = id;
    this.history = [];
    this.totalFetched = 0;
    this.images = [];
    this.totalImages = 0;
    this.profileImage = null;
  }
};
