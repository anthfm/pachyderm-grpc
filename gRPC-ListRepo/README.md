> A very minimal implementation of grpc client and service in node.js

## Instructions to run

Install the grpc dependencies,
```sh
$ npm install
```

Start the server, 
```sh
$ node server.js
GRPC server is running on 50051
```

On a different terminal window, test the server by invoking the client script.
```sh
$ node client.js
{ 
    major: 1,
    minor: 2,
    micro: 3,
    additional: 'additional version info'
}
```

That's all folks!