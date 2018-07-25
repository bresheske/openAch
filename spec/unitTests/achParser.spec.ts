import { AchParser } from "../../services/achParser";
import { assert } from "chai";
import { Logger } from "../../services/logger";

describe("Unit AchParser Tests", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("should fail when file does not exist", async () => {
        let res: boolean;
        try {
            await parser.parseAchFile('file.does.not.exist');
            res = false;
        }
        catch {
            res = true;
        }
        assert(res);
    });

    it("should fail when standard entry class is invalid", async () => {
        let res: boolean;
        try {
            await parser.parseAchFile('./spec/sampleData/basicInvalidSEC.ach');
            res = false;
        }
        catch {
            res = true;
        }
        assert(res);
    });

    it("should fail when record type code is invalid", async () => {
        let res: boolean;
        try {
            await parser.parseAchFile('./spec/sampleData/basicInvalidRTC.ach');
            res = false;
        }
        catch {
            res = true;
        }
        assert(res);
    });

    it("should fail when header record is invalid", async () => {
        let res: boolean;
        try {
            await parser.parseAchFile('./spec/sampleData/basicInvalidHeader.ach');
            res = false;
        }
        catch (ex) {
            res = true;
        }
        assert(res);
    });

});