import { RNG } from "./RNG";
import { Observer } from "./Observer";
import { request, RequestOptions, IncomingMessage } from "http";
import { Buffer } from "buffer";

class Subject {
  private observers: Observer[];
  private filters: RNG[];
  
  constructor() {
    this.observers = [];
    this.filters = [];
  }
  
  addFilter(filter: RNG) {
    this.filters.push(filter);
  }
  
  register(observer: Observer) {
    this.observers.push(observer);
  }
  
  async notifyAll() {
    for (let i = 0; i < this.observers.length; i++) {
      console.log("prenotify")
      await this.observers[i].notify();
      console.log("pstnotify")
    }
  }
  
  async makeRow() {
    let input = "";
    this.filters.forEach(function (filter) {
      input = filter.generate(input);
    });
    
    let body = JSON.stringify(input.slice(0,input.length-1));
    console.log("pre post")
    await this.postData(body);
    console.log("post done")
  }

  private async postData(body: string) {
    return new Promise(async (resolve, reject) => {
      let requestOptions: RequestOptions = {
        hostname: 'localhost',
        port: 3001,
        path: '/data',
        method: 'POST',
        timeout: 1000,
        headers: {
          'Content-Length': Buffer.byteLength(body),
          'Content-Type': 'text/plain'
        }
      };
  
      let retry = async () => {
        await setTimeout(async () => {
          console.log("p retry pre")
          await this.postData(body);
          console.log("p retry post")
        }, 100)
      }
  
      const httpRequest = request(requestOptions, (response: IncomingMessage) => {
        response.on('data', () => {})      
        response.on('end', () => {
          console.log("post complete")
          httpRequest.socket.end();
          httpRequest.socket.destroy();
          response.socket.end();
          response.socket.destroy();
          this.notifyAll().then(() => {
            resolve();
          });
        })
      }).on('error', await retry);
      
      httpRequest.write(body, () => {
        httpRequest.end();
      });

      httpRequest.on('error', (err) => {
        console.log(err);
      })
    });
  }
}

export { Subject };