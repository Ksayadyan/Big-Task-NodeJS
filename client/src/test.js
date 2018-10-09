const HTML = require('html-parse-stringify');
const fs = require('fs');
const request = require("request");
const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/public`))

request({
    uri: "https://google.com",
  }, function(error, response, body) {

let html = `${body}`;
function attributes(obj){
  let string = '';
  for(let x in obj){
    string += x + '=' + '"' + obj[x] + '"' + ' ';
  }
  return string;
}
let ast = HTML.parse(html);
function drawer(arr){
  for(let i = 0; i < arr.length; i++){
    if(arr[i].type == 'tag' && arr[i].name  !=  "--"){
      console.log(`<${arr[i].name}${attributes(arr[i].attrs)}>`);
      if(arr[i].children){
        drawer(arr[i].children);
        if(!arr[i].voidElement){
          console.log(`</${arr[i].name}>`);
        }
      }else{
        return;
      }
    }else{
      if(arr[i].content){
      console.log(arr[i].content);
        }
    }
  }
}




  // app.get('/',(req,res)=>{
  //   res.send(ast)
  
  // })
  
drawer(ast);
fs.writeFileSync('./object.txt', JSON.stringify(ast, 0, 2));
  })
  // app.listen(8080);
  console.log('listening 8080');
//console.log(JSON.stringify(ast, 0, 2));