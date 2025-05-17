export class TextContent {
  constructor(
    public isHeading: boolean,
    public id: string,
    public text: string,
    public fnRefs: string[],
    public summaryRef: string | undefined
  ) {}
}
