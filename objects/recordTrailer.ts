import { AchFile } from "./achFile";

export class RecordTrailer {
    recordTypeCode:number;
    batchCount:number;
    blockCount:number;
    entryCount:number;
    entryHash:number;
    totalDebits:number;
    totalCredits:number;
    reservedData:string;

    static parseLine(line:string, file:AchFile) : RecordTrailer {
        let out = new RecordTrailer();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.batchCount = parseInt(line.substr(1, 6));
        out.blockCount = parseInt(line.substr(7, 6));
        out.entryCount = parseInt(line.substr(13, 8));
        out.entryHash = parseInt(line.substr(21, 10));
        out.totalDebits = parseFloat(`${line.substr(31, 10)}.${line.substr(41, 2)}`);
        out.totalCredits = parseFloat(`${line.substr(43, 10)}.${line.substr(53, 2)}`);
        out.reservedData = line.substr(55, 39);
        return out;
    }
}