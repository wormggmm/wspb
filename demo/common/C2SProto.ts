
import * as IF from "../../src/common/Interface";

export abstract class _Message extends IF.OriginProtoHeader {
    packagename: string;
    type: string;
    constructor(){
        super();
        this.packagename = "C2S_Proto"; // same to *.proto package
        this.type = this.constructor.name;
    }
}

export class TestMessage extends _Message {
    msg:string;
    constructor(){
        super();
    }
}