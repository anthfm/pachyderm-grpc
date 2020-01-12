'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('pps.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.pps.API('192.168.64.8:30650', grpc.credentials.createInsecure())

let request = {
	'pipeline': {
        'name': 'edges4'
    },
    'transform': {
        'image': 'pachyderm/opencv',
        'cmd': ['python3','/pfs/pscript/edges.py']
    },

   'input': {
   	 'cross':[
   	 	{

   		'pfs': {
        	'repo': 'images',
        	'glob': '/*'
    	},
    },
    	{
    	'pfs': {
        	'repo': 'pscript',
        	'glob': '/'
    	}
    }
   ]
   },

        
    'update': false
}

client.CreatePipeline(request, (error, response) => {
  if(error) { return console.error(error) }
  console.log(response)
})
