import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';
import IPInfo, { IPInfoContext } from '../src';
const X = () => {
  const { country_code } = React.useContext(IPInfoContext);
  return <div>{country_code}</div>;
};

// jest.setTimeout(30000);

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <IPInfo>
        <X />
      </IPInfo>,
    );
  });

  // keep it open for 5 seconds and check if it renders
  // it('renders without crashing', async () => {
  //   const { getByText } = render(
  //     <IPInfo>
  //       <X />
  //     </IPInfo>,
  //   );
  //   // await 5 seconds
  //   await new Promise((r) => setTimeout(r, 5000));
  //   getByText('AU');
  // });
});
