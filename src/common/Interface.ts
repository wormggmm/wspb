
import protobuf from "protobufjs"

export interface Map<T>{
    [key:string]:T;
}

export interface OriginMsg extends protobuf.Message{
    packagename:string;
    type:string;
    proBuffer:Uint8Array;
}

export class OriginProtoHeader extends protobuf.Message {
    packagename:string;
    type:string;
}