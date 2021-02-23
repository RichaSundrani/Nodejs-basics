const fs = require('fs'); 
const path = require('path'); 

// // Create folder 
// fs.mkdir(path.join(__dirname, 'test'), {}, function(err){
//     if(err) throw err; 
//     console.log('folder created...');
// });

// create and write to file 
fs.writeFile(path.join(__dirname, 'test', 'hello.txt'), 'Welcome Richard parkar! ', function(err){
    if(err) throw err; 
    console.log('File created...')
})

// Modifiy file 
fs.appendFile(path.join(__dirname, 'test', 'hello.txt'), 'Hello, How are you?', function(err){
    if(err) throw err; 
    console.log('File created...')
}); 

// Read file 
fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf8', function(err, data){
    if(err) throw err; 
    console.log(data)
}); 

// Rename file 
fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'testFile.txt'), function(err){
    if(err) throw err; 
    console.log("File renamed")
}); 