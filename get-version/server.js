'use strict'

const CURRENT_VERSION = {
     major: 1,
     minor: 2,
     micro: 3,
     additional: "additional version info"
}

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('version.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const PORT = 50051 || process.env.PORT

const server = new grpc.Server()

server.addService(proto.versionpb.API.service, {
    GetVersion(call, callback) {
    let res = CURRENT_VERSION
    callback(null, res)
  }
})

server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure())
server.start()
console.log(`GRPC server is running on ${PORT}`)
