import * as winston from "winston";
import { v1 as uuid } from "uuid";
export class Logger {
    private static wlog:winston.Logger;
    private static session:string;

    public static init(force?:boolean) {
        if (force || !this.wlog) {
            this.wlog = winston.createLogger({
                level: 'info',
                transports: [
                    new winston.transports.File({ filename: 'ach.log' })
                ]
            });
            this.session = uuid();
            this.log(`Logger: started new session.`);
        }
    }

    public static async log(message:string) {
        this.init();
        this.wlog.info({session: this.session, message: message, time: new Date()});
    }
}