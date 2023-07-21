export class PageRangeModel {
  workId: number;
  start: number;
  end: number;

  constructor(workId: number, start: number, end: number) {
    this.workId = workId;
    this.start = start;
    this.end = end;
  }
}
