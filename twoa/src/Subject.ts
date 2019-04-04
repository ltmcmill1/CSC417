import { RNG } from "./RNG";
import { Observer } from "./Observer";
import { request, RequestOptions, IncomingMessage, Agent } from "http";
import { Buffer } from "buffer";

class Subject {
  private observers: Observer[];
  private filters: RNG[];
  private httpAgent: Agent = new Agent({
    keepAlive: true
  });
  
  constructor() {
    this.observers = [];
    this.filters = [];
    this.httpAgent.maxSockets = 1;
  }
  
  addFilter(filter: RNG) {
    this.filters.push(filter);
  }
  
  register(observer: Observer) {
    this.observers.push(observer);
  }
  
  async notifyAll() {
    for (let i = 0; i < this.observers.length; i++) {
      await this.observers[i].notify();
    }
  }
  
  async makeRow() {
    let input = "";
    this.filters.forEach(function (filter) {
      input = filter.generate(input);
    });
    
    let body = input.slice(0,input.length-1);
    await this.postData(body);
  }

  private async postData(body: string) {
    return new Promise(async (resolve, reject) => {
      let requestOptions: RequestOptions = {
        hostname: 'localhost',
        port: 3001,
        path: '/data',
        method: 'POST',
        headers: {
          'Content-Length': Buffer.byteLength(body),
          'Content-Type': 'text/plain',
          'Connection': 'Keep-Alive'
        },
        agent: this.httpAgent
      };
  
      let retry = async () => {
        await setTimeout(async () => {
          await this.postData(body);
        }, 100)
      }
  
      const httpRequest = request(requestOptions, (response: IncomingMessage) => {
        response.on('data', () => {})      
        response.on('end', () => {
          this.notifyAll().then(() => {
            resolve();
          });
        })
      }).on('error', await retry);
      
      httpRequest.write(body);
      httpRequest.end();
      
      httpRequest.on('error', (err) => {
        console.log(err);
      })
    });
  }
}

export { Subject };