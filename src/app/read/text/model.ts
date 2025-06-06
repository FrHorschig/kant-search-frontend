export class TextContent {
  constructor(
    public isHeading: boolean,
    public ordinal: number,
    public text: string,
    public fnRefs: string[],
    public summaryRef: string | undefined
  ) {}
}
