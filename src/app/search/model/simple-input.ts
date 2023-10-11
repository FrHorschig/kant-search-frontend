// enum
export enum Section {
  ALL = 0,
  SEC1 = 1,
  SEC2 = 2,
  SEC3 = 3,
  CUSTOM = 4,
}

export class BasicInput {
  constructor(public section: Section, public searchString: string) {}
}
