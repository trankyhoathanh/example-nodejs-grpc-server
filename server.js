let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");

let server = new grpc.Server();
let SERVER_ADDRESS = "0.0.0.0:33001";
 
// Load protobuf
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("validateauth.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

async function sumTotal(call, callback) {
  callback(null, { total: call.request.paramsa + call.request.paramsb })
}
 
// Define server with the methods and start it
server.addService(
  proto.calculatorPackage.SumService.service,
  {
    sumTotal: sumTotal
  }
);

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
console.log('Server running on 33001');
server.start();
