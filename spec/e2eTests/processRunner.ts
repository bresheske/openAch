import * as process from 'child_process';
export class ProcessRunner {

    run(command:string, input?:string):Promise<string> {
        return new Promise((resolve, reject) => {
            let p = process.exec(command, (error, stdout, stderr) => { 
                resolve(stdout);
            });
            if (input) {
                p.stdin.write(input);
                p.stdin.end();
            }
        });
    }

}