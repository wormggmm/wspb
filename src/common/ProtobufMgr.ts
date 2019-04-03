
import path from "path";
import protobuf from "protobufjs";
import * as IF from "./Interface";
export class ProtobufMgr{
    root: protobuf.Root;
    protoConfigPaths:Array<string>;
    baseMessage:protobuf.Type;
    constructor(paths:Array<string>){
        this.protoConfigPaths = [path.resolve("config/base.proto")];
        for(let pathIdx in paths){
            this.protoConfigPaths.push(path.resolve(paths[pathIdx]));
        }
        this.init();
    }
    init(){
        this.root = protobuf.loadSync(this.protoConfigPaths);
        this.baseMessage = this.root.lookupType("__base_package_seuwy321_.BaseMessage");
    }
    decodeOriginData(buffer:Uint8Array){
        if(!buffer){
            return;
        }
        try{
            if(this.baseMessage){
                return <IF.OriginMsg>this.baseMessage.decode(buffer);
            }
        }catch(e){
            if (e instanceof protobuf.util.ProtocolError) {
                // e.instance holds the so far decoded message with missing required fields
              } else {
                // wire format is invalid
              }
        }

    }
    decodeData(buffer:Uint8Array){
        let originMsg:IF.OriginMsg = this.decodeOriginData(buffer);
        if(originMsg){
            return this._decode(originMsg.packagename, originMsg.type, originMsg.proBuffer);
        }
    }
    _decode(packageName:string, type:string, buffer:Uint8Array){
        let protoType:protobuf.Type = this.root.lookupType(`${packageName}.${type}`);
        let msg:IF.OriginProtoHeader = <IF.OriginProtoHeader>protoType.decode(buffer);
        msg.packagename = packageName;
        msg.type = type;
        return msg;
    }
    encodeOriginData(header:IF.OriginProtoHeader, buffer: Uint8Array){
        if(!buffer){
            return;
        }
        try{
            if(this.baseMessage){
                let message:protobuf.Message = this.baseMessage.create({packagename:header.packagename, type:header.type, proBuffer:buffer});
                return this.baseMessage.encode(message).finish();
            }
        }catch(e){
            if (e instanceof protobuf.util.ProtocolError) {
                // e.instance holds the so far decoded message with missing required fields
              } else {
                // wire format is invalid
              }
        }
    }
    encodeData(header:IF.OriginProtoHeader, ppackage: { [k: string]: any; }){
        let buffer:Uint8Array = this._encode(header, ppackage);
        return this.encodeOriginData(header, buffer);
    }
    _encode(header:IF.OriginProtoHeader, ppackage: { [k: string]: any; }){
        let protoType:protobuf.Type = this.root.lookupType(`${header.packagename}.${header.type}`); 
        let b:protobuf.Message = protoType.create(ppackage);
        return protoType.encode(b).finish();
    }
};