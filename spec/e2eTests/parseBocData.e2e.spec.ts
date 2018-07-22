import * as process from 'child_process'
import { ProcessRunner } from './processRunner';
import * as path from 'path';
import { AchFile } from '../../objects/achFile';
import { AssertData } from '../sampleData/assertData';

describe("PPD File Parsing", () => {
    let runner = new ProcessRunner();
    let exepath = path.join(path.resolve('.'), 'dist/ach.exe');

    it("parses basic ppd file", async () => {
        let command = `${exepath} -f spec/sampleData/basicPpdFile.ach`;
        let json = await runner.run(command);
        let result = JSON.parse(json) as AchFile;
        AssertData.assertBasicPpdFile(result);
    });
});