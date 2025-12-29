const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises;


// we can control the flow by keeping the next operation in the call back
fs.readFile(path.join(__dirname, 'files', 'basic.txt'), 'utf-8', (data, err)=>{
    console.error(err);
    console.log(data);

    fs.writeFile('./files/write.txt', 'I am writing to a new file', (err) => {
        console.error(err);

        fs.appendFile('./files/write.txt', '\n I am now appending to the file', (err) => {
            console.error(err)
        })
    });
})

fs.rename(path.join(__dirname, 'files', 'write.txt'), path.join(__dirname, 'files', 'rename.txt'), (err) => {
    if (err) console.error(err)
})

// with promises for async and await 
const fsOps = async () => {
    try{
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'basic.txt'), 'utf-8');
        console.log(data);
        await fsPromise.unlink(path.join(__dirname, 'files', 'rename.txt'))
        await fsPromise.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
    }catch(error){
        console.log(error)
    }
}

fsOps();

// for larger files we can use file stream for more efficiency

const rs = fs.createReadStream('./files/basic.txt', {encoding: 'utf8'});
const ws = fs.createWriteStream('./files/writeStream.txt')

/* 
rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
})    
*/      
// to read data from rs and write it to ws
rs.pipe(ws)

if (!fs.existsSync){
    fs.mkdir('./new', (err) => {
        if (err) console.error(err);
    })
}

if (fs.existsSync){
    fs.mkdir('./new', (err) => {
        if (err) console.error(err);
    })
}
