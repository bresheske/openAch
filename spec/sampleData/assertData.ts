import { AchFile } from "../../objects/achFile";

export class AssertData {
    static assertBasicPpdFile(ach:AchFile) {
        expect(ach.fileHeader).toBeDefined();
        expect(ach.batches).not.toBeNull();
        expect(ach.batches.length).toBe(1);
        expect(ach.batches[0].entries).not.toBeNull();
        expect(ach.batches[0].entries.length).toBe(1);
        expect(ach.batches[0].entries[0].amount).toBe(550.50);
        expect(ach.batches[0].entries[0].traceNumber).toBe('099936340000015');
        expect(ach.batches[0].entries[0].addenda).not.toBeNull();
        expect(ach.batches[0].entries[0].addenda.length).toBe(1);
        expect(ach.batches[0].entries[0].addenda[0].sequenceNumber).toBe(1);
        expect(ach.batches[0].entries[0].addenda[0].detailSequenceNumber).toBe(15);
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