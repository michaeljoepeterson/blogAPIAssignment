
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type:String,required:true},
  author: {
    firstName : {type:String, required:true},
    lastName : {type:String, required:true}
  },
  content: String
});

postSchema.virtual('authorString').get(function(){
    return `${this.author.firstName} ${this.author.lastName}`;
});

postSchema.methods.serialize = function(){
  return{
    id:this._id,
    title: this.title,
    content: this.content,
    author: this.authorString

  };
}
const posts = mongoose.model('posts', postSchema);

module.exports = {posts};