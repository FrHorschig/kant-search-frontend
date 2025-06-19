import { TitleUtil } from './title-util';

describe('TitleUtil', () => {
  it('should leave short title as it is', () => {
    const result = TitleUtil.truncate('in', 2);

    expect(result).toEqual('in');
  });

  it('should truncate long title at max length', () => {
    const result = TitleUtil.truncate('long with spaces', 15);
    expect(result).toEqual('long with ...');
  });

  it('should truncate long title with short end at max length', () => {
    const result = TitleUtil.truncate('long with spaces short end', 25);
    expect(result).toEqual('long with spaces ...');
  });
});
