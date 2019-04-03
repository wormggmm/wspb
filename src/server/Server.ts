

import WebSocket from "ws";
import { ProtobufMgr } from "../common/ProtobufMgr";
import * as IF from "../common/Interface";
export class Server{
    webSocketServer:WebSocket.Server;
    serverOptions:WebSocket.ServerOptions;
    protobufMgr:ProtobufMgr;
    message:(p:IF.OriginProtoHeader) => void;
    constructor(options:WebSocket.ServerOptions, protobufPaths:Array<string>){
        this.serverOptions = options;
        this.protobufMgr = new ProtobufMgr(protobufPaths);
        this.message = this._message;
    }
    open(){
        if(this.webSocketServer){
            throw Error("Server is opened!");
        }
        this.webSocketServer = new WebSocket.Server(this.serverOptions);
        this.webSocketServer.on('connection', (ws:WebSocket)=>{
            this.connection(this, ws);
        });
    }
    connection(self:Server, ws:WebSocket){
        ws.on('message', (msg:Uint8Array)=>{
            self.message(<IF.OriginProtoHeader>self.protobufMgr.decodeData(msg));
        });
    }
    _message(p:IF.OriginProtoHeader):void{
        console.info("server._message default process:", p.toJSON());
    }
}

