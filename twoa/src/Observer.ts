import { Subject } from "./Subject";
import { RequestOptions, IncomingMessage, request } from "http";

class Observer {
  constructor(public subject: Subject) {
    this.subject = subject;
    this.subject.register(this);
  }
  
  async notify() {
    return new Promise(async (resolve, reject) => {
      console.log("preget")
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
        timeout: 10000
      };
  
      let retry = async () => {
        await setTimeout(async () => {
          console.log('retry')
          resolve(await this.getData());
          console.log('retry complete')
        }, 100);
      }
  
      const httpRequest = request(requestOptions, (response: IncomingMessage) => {
        let retData = "";
        response.on('data', (data) => {
          retData = retData + data;
        })      
        response.on('end', () => {
          console.log("get end")
          httpRequest.socket.end();
          httpRequest.socket.destroy();
          response.socket.end();
          response.socket.destroy();
          resolve(JSON.parse(retData));
        })
      }).on('error', await retry);
      httpRequest.end();
    });
  }
}

export { Observer };