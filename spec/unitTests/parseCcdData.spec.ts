import { AchParser } from "../../services/achParser";
import * as path from 'path';
import { RecordCcdEntryDetail } from "../../objects/recordCcdEntryDetail";
import { expect } from "chai";
import { Logger } from "../../services/logger";

describe("Unit CCD File Parsing", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("parses basic ccd file", async () => {
        let result = await parser.parseAchFile(path.join(__dirname, '../sampleData/basicCCDFile.ach'));
        expect(result.fileHeader).not.equal(null);
        expect(result.batches).not.equal(null);
        expect(result.batches.length).equal(1);
        let boc = result.batches[0].entries[0] as RecordCcdEntryDetail;
        expect(boc.amount).equal(50000000.12);
    });

});