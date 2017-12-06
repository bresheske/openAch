import { AchFile } from "./achFile";

export class RecordHeader {
    recordTypeCode:number;
    priorityCode:number;
    immediateDestination:string;
    immediateOrigin:string;
    fileCreationDate:string;
    fileCreationTime:string;
    fileIdModifier:string;
    recordSize:number;
    blockingFactor:number;
    formatCode:number;
    immediateDestinationName:string;
    immediateOriginName:string;
    referenceCode:string;

    static parseLine(line:string, file:AchFile) : RecordHeader {
        let out = new RecordHeader();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.priorityCode = parseInt(line.substr(1,2));
        out.immediateDestination = line.substr(3, 10);
        out.immediateOrigin = line.substr(13, 10);
        out.fileCreationDate = line.substr(23, 6);
        out.fileCreationTime = line.substr(29, 4);
        out.fileIdModifier = line.substr(33, 1);
        out.recordSize = parseInt(line.substr(34, 3));
        out.blockingFactor = parseInt(line.substr(37, 2));
        out.formatCode = parseInt(line.substr(39, 1));
        out.immediateDestinationName = line.substr(40, 23);
        out.immediateOriginName = line.substr(63, 23);
        out.referenceCode = line.substr(86, 8);
        return out;
    }
}