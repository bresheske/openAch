import { AchFile } from "./achFile";
import { RecordAddenda } from "./recordAddenda";

export class RecordPosEntryDetail {
    recordTypeCode: number;
    transactionCode: number;
    receivingAba: string;
    checkDigit: number;
    receivingDda: string;
    amount: number;
    individualId: string;
    individualName: string;
    cardTransactionTypeCode: number;
    addendaRecordIndicator: number;
    traceNumber: string;
    addenda: Array<RecordAddenda> = [];

    static parseLine(line:string, file:AchFile) : RecordPosEntryDetail {
        let out = new RecordPosEntryDetail();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.transactionCode = parseInt(line.substr(1, 2));
        out.receivingAba = line.substr(3, 8);
        out.checkDigit = parseInt(line.substr(11, 1));
        out.receivingDda = line.substr(12, 17);
        out.amount = parseFloat(`${line.substr(29, 8)}.${line.substr(37, 2)}`);
        out.individualId = line.substr(39, 15);
        out.individualName = line.substr(54, 22);
        out.cardTransactionTypeCode = parseInt(line.substr(76, 2));
        out.addendaRecordIndicator = parseInt(line.substr(78, 1));
        out.traceNumber = line.substr(79, 15);
        return out;
    }
}