import { AchFile } from "./achFile";
import { RecordAddenda } from "./recordAddenda";

/**
 * This class handles data for the detail records of type BOC, ARC, and POP.
 */
export class RecordCcdEntryDetail {
    recordTypeCode: number;
    transactionCode: number;
    receivingAba: string;
    checkDigit: number;
    receivingDda: string;
    amount: number;
    identificationNumber: string;
    receivingCompanyName: string;
    discretionaryData: string;
    addendaRecordIndicator: number;
    traceNumber: string;
    addenda: Array<RecordAddenda> = [];

    static parseLine(line:string, file:AchFile) : RecordCcdEntryDetail {
        let out = new RecordCcdEntryDetail();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.transactionCode = parseInt(line.substr(1, 2));
        out.receivingAba = line.substr(3, 8);
        out.checkDigit = parseInt(line.substr(11, 1));
        out.receivingDda = line.substr(12, 17);
        out.amount = parseFloat(`${line.substr(29, 8)}.${line.substr(37, 2)}`);
        out.identificationNumber = line.substr(39, 15);
        out.receivingCompanyName = line.substr(54, 22);
        out.discretionaryData = line.substr(76, 2);
        out.addendaRecordIndicator = parseInt(line.substr(78, 1));
        out.traceNumber = line.substr(79, 15);
        return out;
    }
}