

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('pfs.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.pfs.API('0.0.0.0:30650', grpc.credentials.createInsecure())

let request = {}

client.ListRepo(request, (error, response) => {
  if(error) { return console.error(error) }
  console.log(JSON.stringify(response, undefined, 4))
})