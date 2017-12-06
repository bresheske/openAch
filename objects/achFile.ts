import { RecordHeader } from "./recordHeader";
import { RecordBatch } from "./recordBatch";
import { RecordTrailer } from "./recordTrailer";

export class AchFile {
    fileHeader: RecordHeader;
    fileTrailer: RecordTrailer;
    batches: Array<RecordBatch> = [];
}