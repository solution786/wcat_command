#!/usr/bin/env node

let fs = require('fs');

// manage input 
let inputArr = process.argv.slice(2);
// console.log(inputArr);

// separate options and files
let options = [];
let files = [];
for(let i = 0; i < inputArr.length; i++){
    if(inputArr[i].charAt(0) == '-'){
        options.push(inputArr[i]);
    }else{
        files.push(inputArr[i]);
    }
}

// options check
let isBothPresent = options.includes("-b") && options.includes("-n");
if(isBothPresent){
    console.log("either enter -n or -b option");
    return;
}

// files existence check
for(let i = 0; i < files.length; i++){
    let isPresent = fs.existsSync(files[i]);
    if(isPresent == false){
        console.log(`file ${files[i]} is not present`);
        return;
    }
}


// read files
let content = "";
for(let i = 0; i < files.length; i++){
    let bufferContent = fs.readFileSync(files[i]).toString();
    content += bufferContent + "\r\n";
}

// separate content basis of line breaks
let contentArr = content.split("\r\n");
// console.log(contentArr);

// identify -s
let isSpresent = options.includes('-s');
if(isSpresent){
    for(let i = 1; i < contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }

    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }

    contentArr = tempArr;
}

console.log(contentArr.join("\n"));

let is_n_present = options.includes("-n");
if(is_n_present){
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}

console.log(contentArr.join("\n"));

let is_b_present = options.includes("-b");
if(is_b_present){
    let counter = 1;
    for(let i = 0; i < contentArr.length; i++){
       if(contentArr[i] != ""){
        contentArr[i] = `${counter} ${contentArr[i]}`;
        counter++;
       }
    }
}

console.log(contentArr.join("\n"));