'use strict';

import { Server, IncomingMessage, ServerResponse, OutgoingHttpHeaders, globalAgent } from "http";

class RESTServer {

  private dataStore: Array<String> = [];

  private headers: OutgoingHttpHeaders = {
    'Content-Type': 'text/plain',
    'Connection': 'Keep-Alive'
  };

  constructor() {
    let server: Server = new Server((request: IncomingMessage, response: ServerResponse) => {
      this.retrieveData(request, (data: string) => {
        if (request.method == "POST") {
          if (this.dataStore.length > 1) {
            process.exit(1);
          }
          this.dataStore.push(data);
          console.log(this.dataStore.length + ': ' + data);
          response.writeHead(200, this.headers);
          response.end();
        } else if (request.method == "GET") {
          response.writeHead(200, this.headers);
          response.write(JSON.stringify(this.dataStore.pop()), () => {
            response.end();
          });
        } else {
          response.end();
        }
       
      });
      
    });
    server.listen(3001);
  }

  private retrieveData(request: IncomingMessage, callback: (data: string) => void) {
    let retData = "";
    request.on('data', (chunk) => {
      retData = retData + chunk;
    });

    request.on('end', () => {
      callback(retData);
    });
  }

}

let RESTServerInstance = new RESTServer();