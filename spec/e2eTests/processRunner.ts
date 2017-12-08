import * as process from 'child_process';
export class ProcessRunner {

    run(command:string):Promise<string> {
        return new Promise((resolve, reject) => {
            process.exec(command, (error, stdout, stderr) => { 
                resolve(stdout);
            });
        });
    }

}