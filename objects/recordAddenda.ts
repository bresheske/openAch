import { AchFile } from "./achFile";

export class RecordAddenda {
    recordTypeCode: number;
    addendaTypeCode: number;
    data: string;
    sequenceNumber: number;
    detailSequenceNumber: number;

    static parseLine(line:string, file:AchFile) : RecordAddenda {
        let out = new RecordAddenda();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.addendaTypeCode = parseInt(line.substr(1, 2));
        out.data = line.substr(3, 80);
        out.sequenceNumber = parseInt(line.substr(83, 4));
        out.detailSequenceNumber = parseInt(line.substr(87, 7));
        return out;
    }
}