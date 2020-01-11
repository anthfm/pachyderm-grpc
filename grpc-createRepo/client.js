'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('pfs.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.pfs.API('localhost:50051', grpc.credentials.createInsecure())

let request = {
    'repo': {
        'name': 'some_test_repo'
    },
    'description': "Some repository description",
    'update': false
}

client.CreateRepo(request, (error, response) => {
  if(error) { return console.error(error) }
  console.log(response)
})