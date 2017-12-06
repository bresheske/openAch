import { AchParser } from "./services/achParser";

let argv = require('minimist')(process.argv.slice(2));
(async (args:any) => {
    // Simple file support.
    let filename = args.f;

    if (!filename) {
        console.log(`Expected argument 'f' to specify an ACH filename.`);
        return 1;
    }

    let parser = new AchParser();
    let ach = await parser.parseAchFile(filename);
    console.dir(ach);
})(argv);