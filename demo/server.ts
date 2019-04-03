
import {Server} from "../src/server/Server";
import * as IF from "../src/common/Interface";
import { TestMessage } from "./common/C2SProto";
function main(){
    // create server: can accept multi *.proto config file
    let server:Server = new Server({
        port:3003
    },["./demo/testconfig/C2S.proto"]);
    server.message = (msg:IF.OriginProtoHeader) =>{
        // print receive Message.
        console.info("server recv msg:", msg.type, " msg:", (<TestMessage>msg).msg);
    }
    server.open();
}

main();