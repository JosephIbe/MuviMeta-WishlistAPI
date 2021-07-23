const http = require('http');
const app = require('./app');

const {port} = require('./configs');

const server = http.createServer(app);
server.listen(port, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`MuviMeta API lives at port ${port}`);
});