import { AchFile } from "./achFile";
import { RecordBatchTrailer } from "./recordBatchTrailer";

export class RecordBatch {
    recordTypeCode: number;
    serviceClassCode: number;
    companyName: string;
    companyDiscriptiveData: string;
    companyId: string;
    standardEntryClass: string;
    entryDescription: string;
    companyDescriptiveDate: string;
    effectiveEntryDate: string;
    settlementDate: string;
    originatorStatusCode: string;
    originatorAba: string;
    batchNumber: number;

    entries: Array<any> = [];
    trailer: RecordBatchTrailer;

    static parseLine(line:string, file:AchFile) : RecordBatch {
        let out = new RecordBatch();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.serviceClassCode = parseInt(line.substr(1, 3));
        out.companyName = line.substr(4, 16);
        out.companyDiscriptiveData = line.substr(20, 20);
        out.companyId = line.substr(40, 10);
        out.standardEntryClass = line.substr(50, 3);
        out.entryDescription = line.substr(53, 10);
        out.companyDescriptiveDate = line.substr(63, 6);
        out.effectiveEntryDate = line.substr(69, 6);
        out.settlementDate = line.substr(75, 3);
        out.originatorStatusCode = line.substr(78, 1);
        out.originatorAba = line.substr(79, 8);
        out.batchNumber = parseInt(line.substr(87, 7));
        return out;
    }
}