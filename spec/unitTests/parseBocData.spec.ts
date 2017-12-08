import { AchParser } from "../../services/achParser";
import * as path from 'path';
import { AchFile } from "../../objects/achFile";
import { RecordBocEntryDetail } from "../../objects/recordBocEntryDetail";

describe("PPD File Parsing", () => {
    let parser = new AchParser();

    it("parses basic ppd file", async (done) => {
        let result = await parser.parseAchFile(path.join(__dirname, '../sampleData/basicBocFile.ach'));
        expect(result.fileHeader).toBeDefined();
        expect(result.batches).not.toBeNull();
        expect(result.batches.length).toBe(1);
        let boc = result.batches[0].entries[0] as RecordBocEntryDetail;
        expect(boc.amount).toBe(74.22);
        done();
    });

});