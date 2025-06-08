export interface TextContent {
  readonly isHeading: boolean;
  readonly ordinal: number;
  readonly text: string;
  readonly fnRefs: string[];
  readonly summaryRef: string | undefined;
}
