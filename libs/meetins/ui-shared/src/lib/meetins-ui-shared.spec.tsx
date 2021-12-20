import { render } from '@testing-library/react';

import MeetinsUiShared from './meetins-ui-shared';

describe('MeetinsUiShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MeetinsUiShared />);
    expect(baseElement).toBeTruthy();
  });
});
