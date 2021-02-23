const { copyFileSync } = require('fs');
const url = require('url'); 

const myURL = new URL('https://richasundrani.com');

//Serialized URL 
console.log(myURL.href); 
console.log(myURL.host); 
console.log(myURL.hostname);  // does not give port
console.log(myURL.toString());
console.log(myURL.port); 
console.log(myURL.searchParams.append('abc', '123')); 
console.log(myURL.searchParams);
