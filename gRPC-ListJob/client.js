'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('pps.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.pps.API('0.0.0.0:30650', grpc.credentials.createInsecure())

let request = {
	'pipeline': {
        'name': 'edges'
    },

        
    'update': false
}

client.ListJob(request, (error, response) => {
  if(error) { return console.error(error) }
  console.log(JSON.stringify(response, undefined, 4))
})
