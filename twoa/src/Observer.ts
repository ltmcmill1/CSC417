import { Subject } from "./Subject";
import { RequestOptions, IncomingMessage, request, Agent } from "http";

class Observer {
  private httpAgent: Agent = new Agent({
    keepAlive: true
  });

  constructor(public subject: Subject) {
    this.subject = subject;
    this.subject.register(this);
    this.httpAgent.maxSockets = 1;
  }
  
  async notify() {
    return new Promise(async (resolve, reject) => {
      let data = await this.getData();
      console.log(data);
      resolve();
    });
  }

  private async getData(): Promise<Array<String>> {
    return new Promise<Array<String>>(async (resolve, reject) => {
      let requestOptions: RequestOptions = {
        hostname: 'localhost',
        port: 3001,
        path: '/data',
        method: 'GET',
        agent: this.httpAgent
      };
  
      let retry = async () => {
        await setTimeout(async () => {
          resolve(await this.getData());
        }, 100);
      }
  
      const httpRequest = request(requestOptions, (response: IncomingMessage) => {
        let retData = "";
        response.on('data', (data) => {
          retData = retData + data;
        })      
        response.on('end', () => {
          resolve(JSON.parse(retData));
        })
      }).on('error', await retry).end();
    });
  }
}

export { Observer };