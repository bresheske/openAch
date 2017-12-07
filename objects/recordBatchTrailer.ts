import { AchFile } from "./achFile";

export class RecordBatchTrailer {
    recordTypeCode: number;
    serviceClassCode: number;
    entryCount: number;
    entryHash: number;
    totalDebitAmount: number;
    totalCreditAmount: number;
    companyId: string;
    authenticationCode: string;
    reservedData: string;
    originatorAba: string;
    batchNumber: number;

    static parseLine(line:string, file:AchFile) : RecordBatchTrailer {
        let out = new RecordBatchTrailer();
        out.recordTypeCode = parseInt(line.substr(0, 1));
        out.serviceClassCode = parseInt(line.substr(1, 3));
        out.entryCount = parseInt(line.substr(4, 6));
        out.entryHash = parseInt(line.substr(10, 10));
        out.totalDebitAmount = parseFloat(`${line.substr(20, 10)}.${line.substr(30, 2)}`);
        out.totalDebitAmount = parseFloat(`${line.substr(32, 10)}.${line.substr(42, 2)}`);
        out.companyId = line.substr(44, 10);
        out.authenticationCode = line.substr(54, 20);
        out.reservedData = line.substr(73, 6);
        out.originatorAba = line.substr(79, 8);
        out.batchNumber = parseInt(line.substr(87, 7));
        return out;
    }
}