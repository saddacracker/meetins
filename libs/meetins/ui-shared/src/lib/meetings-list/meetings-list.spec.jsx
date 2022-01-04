import { render } from '@testing-library/react';

import MeetingsList from './meetings-list';

describe('MeetingsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetingsList />);
    expect(baseElement).toBeTruthy();
  });
});
