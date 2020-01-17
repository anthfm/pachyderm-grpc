'use strict'
const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('pfs.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);
const { Readable } = require('stream');

const PORT = 30650 || process.env.PORT

const server = new grpc.Server()


/*
function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });

  return readableInstanceStream;
}
*/

server.addService(proto.pfs.API.service, {
    GetFile(call, callback) {
    console.log(`Recieved request ${JSON.stringify(call.request, undefined, 2)}`)
    let path = call.request.file.path

    fs.readFile(path, function(err, data) {
      if (err) {
        console.log(err)
        callback(err, {})
      } else {
        let res = {
          value: data
        }
        callback(null, res)
      }
    })
  }
})


server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure())
server.start()
console.log(`GRPC server is running on ${PORT}`)
