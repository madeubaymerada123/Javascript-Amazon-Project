import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', ()=> {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cent', ()=> {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  //16a check if code round down to nearest cent
  it('rounds down to nearest cent', ()=>{
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  //16b check with a negative number
  it('test with a negative number', ()=>{
    expect(formatCurrency(-2095)).toEqual('-20.95');
  });
});
