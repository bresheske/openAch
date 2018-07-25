import { AchParser } from "../../services/achParser";
import { assert } from "chai";
import { Logger } from "../../services/logger";
import * as fs from "async-file";
import { Duplex } from "stream";
import { AssertData } from "../sampleData/assertData";

describe("Unit AchParser Tests", () => {
    let parser = new AchParser();

    beforeEach(() => {
        Logger.init(true);
    });

    it("should correctly accept piped data", async () => {
        let data = await fs.readFile('./spec/sampleData/basicPpdFile.ach');
        let stream = new Duplex();
        stream.push(data);
        stream.push(null);
        let res = await parser.parseAchFile(stream);
        AssertData.assertBasicPpdFile(res);
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