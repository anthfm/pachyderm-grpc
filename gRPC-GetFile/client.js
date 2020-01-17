'use strict'
const grpc = require('grpc');
var fs = require('fs');
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('pfs.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.pfs.API('0.0.0.0:30650', grpc.credentials.createInsecure())


let request = {
    'file': {
        'commit':{
            'id': '2f72c773265246ffa4d167eacb38c9c0',
            'repo': {
                'name': 'CCLE'
            }
    },
        'path': 'testanth.RData'
    },
    
  offset_bytes: 0,
  size_bytes: 0
}


client.GetFile(request, (error, response) => {
  if(error) { return console.error(error) }
  let save_path = "received_" + request.file.path
  fs.writeFile(save_path, response.value, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("File saved!");
  }); 
})
