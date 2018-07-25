import { AchParser } from "../../services/achParser";
import { expect, assert } from "chai";
import { Logger } from "../../services/logger";

describe("Unit AchParser Tests", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("should fail when file does not exist", async () => {
        try {
            await parser.parseAchFile('file.does.not.exist');
            assert(false);
        }
        catch {
            assert(true);
        }
    });

    it("should fail when standard entry class is invalid", async () => {
        try {
            await parser.parseAchFile('./spec/sampleData/basicInvalidSEC.ach');
            assert(false);
        }
        catch {
            assert(true);
        }
    });

});