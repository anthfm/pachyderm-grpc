'use strict'

const repo = { name: 1}

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('pfs.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const PORT = 30650 || process.env.PORT


const server = new grpc.Server()


server.addService(proto.pfs.API.service, {
    ListRepo(call, callback) {
    console.log(`Recieved request ${JSON.stringify(call.request, undefined, 4)}`)
    callback(null, repo)
  }
})


server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure())
server.start()
console.log(`GRPC server is running on ${PORT}`)

