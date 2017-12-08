import { AchParser } from "../../services/achParser";
import * as path from 'path';
import { AchFile } from "../../objects/achFile";
import { AssertData } from "../sampleData/assertData";

describe("PPD File Parsing", () => {
    let parser = new AchParser();

    it("parses basic ppd file", async (done) => {
        let result = await parser.parseAchFile(path.join(__dirname, '../sampleData/basicPpdFile.ach'));
        AssertData.assertBasicPpdFile(result);
        done();
    });

});