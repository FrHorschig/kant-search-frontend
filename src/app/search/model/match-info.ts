import { Match } from 'kant-search-api';

export interface MatchInfo {
  workId: number;
  workTitle: string;
  match: Match;
  index: number;
}
