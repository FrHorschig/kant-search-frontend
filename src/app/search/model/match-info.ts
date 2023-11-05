import { Match } from '@frhorschig/kant-search-api';

export interface MatchInfo {
  workId: number;
  workCode: string;
  match: Match;
  index: number;
}
