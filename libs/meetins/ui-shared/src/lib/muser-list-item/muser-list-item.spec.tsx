import { render } from '@testing-library/react';

import MUserListItem from './muser-list-item';

describe('MUserListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MUserListItem />);
    expect(baseElement).toBeTruthy();
  });
});
