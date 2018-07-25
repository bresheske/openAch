import { AchParser } from "../../services/achParser";
import * as path from 'path';
import { AchFile } from "../../objects/achFile";
import { RecordBocEntryDetail } from "../../objects/recordBocEntryDetail";
import { expect } from "chai";
import { Logger } from "../../services/logger";

describe("Unit BOC File Parsing", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("parses basic boc file", async () => {
        let result = await parser.parseAchFile(path.join(__dirname, '../sampleData/basicBocFile.ach'));
        expect(result.fileHeader).not.equal(null);
        expect(result.batches).not.equal(null);
        expect(result.batches.length).equal(1);
        let boc = result.batches[0].entries[0] as RecordBocEntryDetail;
        expect(boc.amount).equal(74.22);
    });

});