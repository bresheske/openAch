import * as fs from 'async-file';
import * as readline from 'readline';
import { AchFile } from '../objects/achFile';
import { RecordHeader } from '../objects/recordHeader';
import { RecordBatch } from '../objects/recordBatch';
import { RecordPpdEntryDetail } from '../objects/recordPpdEntryDetail';
import { RecordAddenda } from '../objects/recordAddenda';
import { RecordBocEntryDetail } from '../objects/recordBocEntryDetail';
import { RecordCcdEntryDetail } from '../objects/recordCcdEntryDetail';
import { RecordCtxEntryDetail } from '../objects/recordCtxEntryDetail';
import { RecordPosEntryDetail } from '../objects/recordPosEntryDetail';
import { RecordBatchTrailer } from '../objects/recordBatchTrailer';
import { RecordTrailer } from '../objects/recordTrailer';
import { Readable } from 'stream';
import { ReadLine } from 'readline';
import { Logger } from './logger';
export class AchParser {

    private async createReadStream(data:string|Readable): Promise<ReadLine> {
        let stream: ReadLine;
        if (typeof data == 'string') {
            try {
                await fs.stat(data);
                stream = readline.createInterface({
                    input: fs.createReadStream(data)
                });
            }
            catch (ex) {
                let m = `AchParser: error reading file '${data}'. Message: ${ex}.`;
                Logger.error(m);
                throw new Error(m);
            }
        }
        else {
            stream = readline.createInterface({
                input: data
            });
        }
        return stream;
    }

    private handleLine(line:string, ach:AchFile, linenum:number) {
        if (line[0] == '1')
            ach.fileHeader = RecordHeader.parseLine(line, ach);
        else if (line[0] == '5')
            ach.batches.push(RecordBatch.parseLine(line, ach));
        else if (line[0] == '6') {
            let batch = ach.batches[ach.batches.length - 1];
            let parseFunc = 
                batch.standardEntryClass == 'PPD' || batch.standardEntryClass == 'TEL' || batch.standardEntryClass == 'WEB'
                    ? RecordPpdEntryDetail.parseLine
                : batch.standardEntryClass == 'BOC' || batch.standardEntryClass == 'ARC' || batch.standardEntryClass == 'POP'
                    ? RecordBocEntryDetail.parseLine
                : batch.standardEntryClass == 'CCD'
                    ? RecordCcdEntryDetail.parseLine
                : batch.standardEntryClass == 'CTX'
                    ? RecordCtxEntryDetail.parseLine
                : batch.standardEntryClass == 'POS'
                    ? RecordPosEntryDetail.parseLine
                : null;
            if (!parseFunc) {
                let m = `AchParser: error(line ${linenum}): standard entry class '${batch.standardEntryClass}' is not valid.`;
                throw new Error(m);
            }
            ach.batches[ach.batches.length - 1].entries.push(parseFunc(line, ach));
        }
        else if (line[0] == '7') {
            let batch = ach.batches[ach.batches.length - 1];
            let parseFunc = RecordAddenda.parseLine;
            batch.entries[ach.batches[ach.batches.length - 1].entries.length - 1]
                .addenda.push(parseFunc(line, ach));
        }
        else if (line[0] == '8') {
            let batch = ach.batches[ach.batches.length - 1];
            batch.trailer = RecordBatchTrailer.parseLine(line, ach);
        }
        else if (line[0] == '9') {
            ach.fileTrailer = RecordTrailer.parseLine(line, ach);
        }
        else {
            let m = `AchParser: error(line ${linenum}): record type code '${line[0]}' is not valid.`;
            throw new Error(m);
        }
    }

    async parseAchFile(data:string|Readable): Promise<AchFile> {
        return new Promise<AchFile>(async (resolve, reject) => {
            let reader:ReadLine;
            try {
                reader = await this.createReadStream(data);
                Logger.info(`AchParser: stream opened successfully.`);
            }
            catch (ex) {
                let m = `AchParser: error creating read stream for ACH parser.`;
                Logger.error(m);
                reject(Error(m));
                return;
            }

            let linenum = 0;
            let ach = new AchFile();
            
            reader.on('line', (line) => {
                linenum++;
                try {
                    this.handleLine(line, ach, linenum);
                }
                catch (ex) {
                    let m = `AchParser: error reading line ${linenum}. ${ex}`;
                    Logger.error(m);
                    reject(Error(m));
                }
            });
            reader.on('close', () => {
                Logger.info(`AchParser: stream closed. Lines read: ${linenum}.`);
                resolve(ach);
            });
            reader.on('end', () => {
                Logger.info(`AchParser: stream ended. Lines read: ${linenum}.`);
                resolve(ach);
            });
            reader.on('error', (err) => {
                Logger.error(`AchParser: error while reading ACH stream. ${err}`);
                reject(Error(err));
            });

        });
    }

}