import { AchParser } from "../../services/achParser";
import * as path from 'path';
import { AchFile } from "../../objects/achFile";
import { AssertData } from "../sampleData/assertData";
import { Logger } from "../../services/logger";

describe("Unit PPD File Parsing", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("parses basic ppd file", async () => {
        let result = await parser.parseAchFile(path.join(__dirname, '../sampleData/basicPpdFile.ach'));
        AssertData.assertBasicPpdFile(result);
    });

});