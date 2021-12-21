import { render } from '@testing-library/react';

import MHeader from './mheader';

describe('MHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MHeader />);
    expect(baseElement).toBeTruthy();
  });
});
