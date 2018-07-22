import { AchFile } from "../../objects/achFile";
import { RecordPpdEntryDetail } from "../../objects/recordPpdEntryDetail";
import { RecordAddenda } from "../../objects/recordAddenda";
import { expect } from "chai";

export class AssertData {
    static assertBasicPpdFile(ach:AchFile) {
        // file header
        expect(ach.fileHeader.recordTypeCode).equal(1);
        expect(ach.fileHeader.priorityCode).equal(1);
        expect(ach.fileHeader.immediateDestination.trim()).equal('691000134');
        expect(ach.fileHeader.immediateOrigin.trim()).equal('099912345');
        expect(ach.fileHeader.fileCreationDate.trim()).equal('090601');
        expect(ach.fileHeader.fileCreationTime.trim()).equal('1138');
        expect(ach.fileHeader.fileIdModifier.trim()).equal('A');
        expect(ach.fileHeader.recordSize).equal(94);
        expect(ach.fileHeader.blockingFactor).equal(10);
        expect(ach.fileHeader.formatCode).equal(1);
        expect(ach.fileHeader.immediateDestinationName.trim()).equal('FEDERAL RESERVE BANK');
        expect(ach.fileHeader.immediateOriginName.trim()).equal('MY BANK');
        expect(ach.fileHeader.referenceCode.trim()).equal('REF00200');

        // batch header
        expect(ach.batches.length).equal(1);
        let batch = ach.batches[0];
        expect(batch.recordTypeCode).equal(5);
        expect(batch.serviceClassCode).equal(200);
        expect(batch.companyName.trim()).equal('CompanyNameHere');
        expect(batch.companyDiscriptiveData.trim()).equal('CompanyDescriptive');
        expect(batch.companyId.trim()).equal('CompanyID');
        expect(batch.standardEntryClass.trim()).equal('PPD');
        expect(batch.entryDescription.trim()).equal('EntryDesc');
        expect(batch.companyDescriptiveDate.trim()).equal('DeDate');
        expect(batch.effectiveEntryDate.trim()).equal('171206');
        expect(batch.settlementDate.trim()).equal('340');
        expect(batch.originatorStatusCode.trim()).equal('A');
        expect(batch.originatorAba.trim()).equal('00000023');
        expect(batch.batchNumber).equal(10);

        // batch entries
        expect(batch.entries.length).equal(1);
        let entry = batch.entries[0] as RecordPpdEntryDetail;
        expect(entry.recordTypeCode).equal(6);
        expect(entry.transactionCode).equal(27);
        expect(entry.receivingAba.trim()).equal('09101298');
        expect(entry.checkDigit).equal(7);
        expect(entry.receivingDda.trim()).equal('4647-999');
        expect(entry.amount).equal(550.50);
        expect(entry.individualId.trim()).equal('658-888-2468');
        expect(entry.individualName.trim()).equal('Alex Dubrovsky');
        expect(entry.discretionaryData.trim()).equal('12');
        expect(entry.addendaRecordIndicator).equal(0);
        expect(entry.traceNumber).equal('099936340000015');

        // batch addenda
        expect(entry.addenda.length).equal(1);
        let addenda = entry.addenda[0] as RecordAddenda;
        expect(addenda.recordTypeCode).equal(7);
        expect(addenda.addendaTypeCode).equal(5);
        expect(addenda.sequenceNumber).equal(1);
        expect(addenda.data.trim()).equal('N1*1U*Spring Valley Nursing\\N1*BE*Dante Culpepper*34*468669999\\');
        expect(addenda.sequenceNumber).equal(1);
        expect(addenda.detailSequenceNumber).equal(15);

        // batch trailer
        expect(batch.trailer.recordTypeCode).equal(8);
        expect(batch.trailer.serviceClassCode).equal(200);
        expect(batch.trailer.entryCount).equal(1);
        expect(batch.trailer.entryHash).equal(102030405);
        expect(batch.trailer.totalDebitAmount).equal(1250.50);
        expect(batch.trailer.totalCreditAmount).equal(1250.50);
        expect(batch.trailer.companyId.trim()).equal('1234567890');
        expect(batch.trailer.authenticationCode.trim()).equal('SampleMessageAuth');
        expect(batch.trailer.reservedData.trim()).equal('010000');
        expect(batch.trailer.originatorAba.trim()).equal('00001111');
        expect(batch.trailer.batchNumber).equal(7);

        // file trailer
        expect(ach.fileTrailer.batchCount).equal(1);
        expect(ach.fileTrailer.blockCount).equal(1);
        expect(ach.fileTrailer.entryCount).equal(2);
        expect(ach.fileTrailer.entryHash).equal(9101298);
        expect(ach.fileTrailer.totalDebits).equal(0);
        expect(ach.fileTrailer.totalCredits).equal(950.00);
        expect(ach.fileTrailer.reservedData.trim()).equal('Reserved');
    }
}