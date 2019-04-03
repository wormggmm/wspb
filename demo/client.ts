
import {Client} from "../src/client/Client";
import { TestMessage } from "./common/C2SProto";
function main(){
    // create client: can accept multi *.proto config file
    let client:Client = new Client("http://localhost:3003", ["./demo/testconfig/C2S.proto"]);

    // set connection callback
    client.connection = () => {
        console.info("server connected!");

        // send testMessage proto to server
        let msg:TestMessage = new TestMessage();
        msg.msg = "hello world!";
        client.send(msg);
    }

    client.open();

}

main();