



import WebSocket from "ws";
import {ProtobufMgr} from "../common/ProtobufMgr";
import * as IF from "../common/Interface";
export class Client{
    webSocketClient:WebSocket;
    clientOptions:WebSocket.ClientOptions;
    protobufMgr:ProtobufMgr;
    url:string;
    connection:() => void;
    close:() => void;
    message:() => void;
    constructor(url:string,  protobufPaths:Array<string>, options:WebSocket.ClientOptions = null){
        this.url = url;
        this.clientOptions = options;
        this.protobufMgr = new ProtobufMgr(protobufPaths);
        this.connection = this._connection;
        this.close = this._close;
        this.message = this._message;
    }
    open(){
        if(this.webSocketClient){
            throw Error("Server is opened!");
        }
        this.webSocketClient = new WebSocket(this.url, this.clientOptions);
        this.webSocketClient.on("open", ()=>{
            this.connection()
        });
        this.webSocketClient.on("close", ()=>{
            this.close();
        });
        this.webSocketClient.on("message", (msg:Uint8Array)=>{
            this.message();
        });

    }
    send(msg:IF.OriginProtoHeader){
        this.webSocketClient.send(this.protobufMgr.encodeData(msg, msg), (err) =>{
            console.error("err:", err);
        });
    }
    _connection(){
    }
    _close(){
    }
    _message(){
    }
}
