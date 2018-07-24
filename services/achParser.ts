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
import { Stream, Readable } from 'stream';
export class AchParser {

    async parseAchFile(data:string|Readable): Promise<AchFile> {
        return new Promise<AchFile>(async (resolve, reject) => {

            let reader;
            // if the input is a filename, we'll open the stream to the file.
            if (typeof data == 'string') {
                try {
                    await fs.stat(data);
                    reader = readline.createInterface({
                        input: fs.createReadStream(data)
                    });
                }
                catch (ex) {
                    reject(ex);
                    return;
                }
            }
            // otherwise, we'll just open a reader to the stream.
            else {
                reader = readline.createInterface({
                    input: data
                });
            }

            // open the file and begin reading.
            let linenum = 0;
            let ach = new AchFile();
            
            reader.on('line', (line) => {
                linenum++;

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
                        : (line:string, ach:AchFile) => { 
                            reject(Error(`Error: standard entry class '${batch.standardEntryClass}' is not valid.`)); 
                        };
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

            });
            reader.on('close', () => {
                resolve(ach);
            });
            reader.on('end', () => {
                resolve(ach);
            });
            reader.on('error', (err) => {
                reject(err);
                return;
            });

        });
    }

}