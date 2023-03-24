import * as React from 'react';
import { render } from '@testing-library/react';
import 'jest-canvas-mock';

const X = () => {
  return <></>;
};

jest.setTimeout(30000);

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<X />);
  });
});
