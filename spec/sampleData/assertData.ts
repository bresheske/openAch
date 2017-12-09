import { AchFile } from "../../objects/achFile";
import { RecordPpdEntryDetail } from "../../objects/recordPpdEntryDetail";
import { RecordAddenda } from "../../objects/recordAddenda";

export class AssertData {
    static assertBasicPpdFile(ach:AchFile) {
        // file header
        expect(ach.fileHeader).toBeDefined();
        expect(ach.fileHeader.recordTypeCode).toBe(1);
        expect(ach.fileHeader.priorityCode).toBe(1);
        expect(ach.fileHeader.immediateDestination.trim()).toBe('691000134');
        expect(ach.fileHeader.immediateOrigin.trim()).toBe('099912345');
        expect(ach.fileHeader.fileCreationDate.trim()).toBe('090601');
        expect(ach.fileHeader.fileCreationTime.trim()).toBe('1138');
        expect(ach.fileHeader.fileIdModifier.trim()).toBe('A');
        expect(ach.fileHeader.recordSize).toBe(94);
        expect(ach.fileHeader.blockingFactor).toBe(10);
        expect(ach.fileHeader.formatCode).toBe(1);
        expect(ach.fileHeader.immediateDestinationName.trim()).toBe('FEDERAL RESERVE BANK');
        expect(ach.fileHeader.immediateOriginName.trim()).toBe('MY BANK');
        expect(ach.fileHeader.referenceCode.trim()).toBe('REF00200');

        // batch header
        expect(ach.batches).not.toBeNull();
        expect(ach.batches.length).toBe(1);
        let batch = ach.batches[0];
        expect(batch.recordTypeCode).toBe(5);
        expect(batch.serviceClassCode).toBe(200);
        expect(batch.companyName.trim()).toBe('CompanyNameHere');
        expect(batch.companyDiscriptiveData.trim()).toBe('CompanyDescriptive');
        expect(batch.companyId.trim()).toBe('CompanyID');
        expect(batch.standardEntryClass.trim()).toBe('PPD');
        expect(batch.entryDescription.trim()).toBe('EntryDesc');
        expect(batch.companyDescriptiveDate.trim()).toBe('DeDate');
        expect(batch.effectiveEntryDate.trim()).toBe('171206');
        expect(batch.settlementDate.trim()).toBe('340');
        expect(batch.originatorStatusCode.trim()).toBe('A');
        expect(batch.originatorAba.trim()).toBe('00000023');
        expect(batch.batchNumber).toBe(10);

        // batch entries
        expect(batch.entries).not.toBeNull();
        expect(batch.entries.length).toBe(1);
        let entry = batch.entries[0] as RecordPpdEntryDetail;
        expect(entry.recordTypeCode).toBe(6);
        expect(entry.transactionCode).toBe(27);
        expect(entry.receivingAba.trim()).toBe('09101298');
        expect(entry.checkDigit).toBe(7);
        expect(entry.receivingDda.trim()).toBe('4647-999');
        expect(entry.amount).toBe(550.50);
        expect(entry.individualId.trim()).toBe('658-888-2468');
        expect(entry.individualName.trim()).toBe('Alex Dubrovsky');
        expect(entry.discretionaryData.trim()).toBe('12');
        expect(entry.addendaRecordIndicator).toBe(0);
        expect(entry.traceNumber).toBe('099936340000015');

        // batch addenda
        expect(entry.addenda).not.toBeNull();
        expect(entry.addenda.length).toBe(1);
        let addenda = entry.addenda[0] as RecordAddenda;
        expect(addenda.recordTypeCode).toBe(7);
        expect(addenda.addendaTypeCode).toBe(5);
        expect(addenda.sequenceNumber).toBe(1);
        expect(addenda.data.trim()).toBe('N1*1U*Spring Valley Nursing\\N1*BE*Dante Culpepper*34*468669999\\');
        expect(addenda.sequenceNumber).toBe(1);
        expect(addenda.detailSequenceNumber).toBe(15);

        // batch trailer
        expect(batch.trailer).not.toBeNull();
        expect(batch.trailer.recordTypeCode).toBe(8);
        expect(batch.trailer.serviceClassCode).toBe(200);
        expect(batch.trailer.entryCount).toBe(1);
        expect(batch.trailer.entryHash).toBe(102030405);
        expect(batch.trailer.totalDebitAmount).toBe(1250.50);
        expect(batch.trailer.totalCreditAmount).toBe(1250.50);
        expect(batch.trailer.companyId.trim()).toBe('1234567890');
        expect(batch.trailer.authenticationCode.trim()).toBe('SampleMessageAuth');
        expect(batch.trailer.reservedData.trim()).toBe('010000');
        expect(batch.trailer.originatorAba.trim()).toBe('00001111');
        expect(batch.trailer.batchNumber).toBe(7);

        // file trailer
        expect(ach.fileTrailer).toBeDefined();
        expect(ach.fileTrailer.batchCount).toBe(1);
        expect(ach.fileTrailer.blockCount).toBe(1);
        expect(ach.fileTrailer.entryCount).toBe(2);
        expect(ach.fileTrailer.entryHash).toBe(9101298);
        expect(ach.fileTrailer.totalDebits).toBe(0);
        expect(ach.fileTrailer.totalCredits).toBe(950.00);
        expect(ach.fileTrailer.reservedData.trim()).toBe('Reserved');
    }
}