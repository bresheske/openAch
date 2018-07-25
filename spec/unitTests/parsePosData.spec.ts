import { AchParser } from "../../services/achParser";
import * as path from 'path';
import { expect } from "chai";
import { Logger } from "../../services/logger";
import { RecordPosEntryDetail } from "../../objects/recordPosEntryDetail";

describe("Unit POS File Parsing", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("parses basic pos file", async () => {
        let result = await parser.parseAchFile(path.join(__dirname, '../sampleData/basicPOSFile.ach'));
        expect(result.fileHeader).not.equal(null);
        expect(result.batches).not.equal(null);
        expect(result.batches.length).equal(1);
        let boc = result.batches[0].entries[0] as RecordPosEntryDetail;
        expect(boc.amount).equal(50000000.12);
    });

});