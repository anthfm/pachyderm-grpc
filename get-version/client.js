'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('version.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.versionpb.API('localhost:50051', grpc.credentials.createInsecure())

let request = {}

client.GetVersion(request, (error, response) => {
  if(error) { return console.error(error) }
  console.log(response)
})