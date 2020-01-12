'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('pps.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const PORT = 30650 || process.env.PORT

const server = new grpc.Server()

server.addService(proto.pps.API.service, {
    CreatePipeline(call, callback) {

    console.log(`Recieved request ${JSON.stringify(call.request, undefined, 2)}`)

    // Returns an empty response
    let res = {}
    callback(null, res)
  }
})

server.bind(`192.168.64.8:${PORT}`, grpc.ServerCredentials.createInsecure())
server.start()
console.log(`GRPC server is running on ${PORT}`)
