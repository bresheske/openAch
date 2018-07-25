import { AchParser } from "../../services/achParser";
import { expect, assert } from "chai";

describe("Unit AchParser Tests", () => {
    let parser = new AchParser();

    it("should fail when file does not exist", async () => {
        try {
            await parser.parseAchFile('file.does.not.exist');
            assert(false);
        }
        catch {
            assert(true);
        }
    });

});