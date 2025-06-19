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

  it('should truncate title without space', () => {
    const result = TitleUtil.truncate('onelongword', 6);
    expect(result).toEqual('one...');
  });

  it('should convert all-caps to title case', () => {
    const result = TitleUtil.titleCase('SKDFJALK');
    expect(result).toEqual('Skdfjalk');
  });

  it('should convert all-lower to title case', () => {
    const result = TitleUtil.titleCase('skdfjalk');
    expect(result).toEqual('Skdfjalk');
  });

  it('should handle empty string', () => {
    const result = TitleUtil.titleCase('');
    expect(result).toEqual('');
  });
});
