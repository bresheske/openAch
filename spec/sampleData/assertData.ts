import { AchFile } from "../../objects/achFile";

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

        // batch entries
        expect(ach.batches[0].entries).not.toBeNull();
        expect(ach.batches[0].entries.length).toBe(1);
        expect(ach.batches[0].entries[0].amount).toBe(550.50);
        expect(ach.batches[0].entries[0].traceNumber).toBe('099936340000015');

        // batch addenda
        expect(ach.batches[0].entries[0].addenda).not.toBeNull();
        expect(ach.batches[0].entries[0].addenda.length).toBe(1);
        expect(ach.batches[0].entries[0].addenda[0].sequenceNumber).toBe(1);
        expect(ach.batches[0].entries[0].addenda[0].detailSequenceNumber).toBe(15);

        // batch trailer

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