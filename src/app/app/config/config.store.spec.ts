import { EMPTY, Observable } from "rxjs";
import { Config } from "./config.store";

export class MockConfigStore {
  config$: Observable<Config> = EMPTY;

  init = jasmine.createSpy('init');
  navigateToSection = jasmine.createSpy('navigateToSection');
}

