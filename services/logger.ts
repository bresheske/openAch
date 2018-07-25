import * as winston from "winston";
import { v1 as uuid } from "uuid";
export class Logger {
    private static wlog:any;
    private static session:string;

    private static openLog() {
        if (!this.wlog) {
            this.wlog = winston.createLogger({
                level: 'info',
                transports: [
                    new winston.transports.File({ filename: 'ach.log' })
                ]
            });
            this.session = uuid();
        }
    }

    public static async log(message:string) {
        this.openLog();
        this.wlog.info({session: this.session, message: message, time: new Date()});
    }
}