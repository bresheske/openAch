import { AchParser } from "./services/achParser";
import * as path from 'path';
import { Logger } from "./services/logger";

let argv = require('minimist')(process.argv.slice(2));
(async (args:any) => {
    // Simple file support.
    let filename = args.f;
    if (filename)
        filename = path.resolve(filename.trim());

    let parser = new AchParser();

    // Defaults to process standard input if filename not present.
    let ach = await parser.parseAchFile(filename || process.stdin);
    console.log(JSON.stringify(ach));
})(argv);