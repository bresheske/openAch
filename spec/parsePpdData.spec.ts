import { AchParser } from "../services/achParser";
import * as path from 'path';
import { AchFile } from "../objects/achFile";

describe("PPD File Parsing", () => {
    let parser = new AchParser();

    it("parses basic ppd file", async (done) => {
        let result = await parser.parseAchFile(path.join(__dirname, 'sampleData/basicPpdFile.ach'))
        expect(result.fileHeader).toBeDefined();
        expect(result.batches).not.toBeNull();
        expect(result.batches.length).toBe(1);
        expect(result.batches[0].entries).not.toBeNull();
        expect(result.batches[0].entries.length).toBe(1);
        expect(result.batches[0].entries[0].amount).toBe(550.50);
        expect(result.batches[0].entries[0].traceNumber).toBe('099936340000015');
        expect(result.batches[0].entries[0].addenda).not.toBeNull();
        expect(result.batches[0].entries[0].addenda.length).toBe(1);
        expect(result.batches[0].entries[0].addenda[0].sequenceNumber).toBe(1);
        expect(result.batches[0].entries[0].addenda[0].detailSequenceNumber).toBe(15);
        expect(result.fileTrailer).toBeDefined();
        expect(result.fileTrailer.batchCount).toBe(1);
        expect(result.fileTrailer.blockCount).toBe(1);
        expect(result.fileTrailer.entryCount).toBe(2);
        expect(result.fileTrailer.entryHash).toBe(9101298);
        expect(result.fileTrailer.totalDebits).toBe(0);
        expect(result.fileTrailer.totalCredits).toBe(950.00);
        expect(result.fileTrailer.reservedData.trim()).toBe('Reserved');
        done();
    });

});