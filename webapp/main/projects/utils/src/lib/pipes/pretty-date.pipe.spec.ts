import * as moment from 'moment';
import { PrettyDatePipe } from './pretty-date.pipe';

describe('PrettyDatePipe', () => {

  it('transform an old date to mm/dd/yyyy format', () => {
    const pipe = new PrettyDatePipe();
    const date = new Date(2021, 0, 15);
    expect(pipe.transform(date)).toBe('01/15/2021');
  });

  it('transform near date to relative format', () => {
    const pipe = new PrettyDatePipe();
    const date = moment().subtract(1, 'day').hour(5).minute(5).toDate();
    expect(pipe.transform(date)).toBe('Yesterday at 5:05 AM');
  });
});
