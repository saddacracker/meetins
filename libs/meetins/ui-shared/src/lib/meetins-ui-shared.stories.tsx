import { Story, Meta } from '@storybook/react';
import { MeetinsUiShared, MeetinsUiSharedProps } from './meetins-ui-shared';

export default {
  component: MeetinsUiShared,
  title: 'MeetinsUiShared',
} as Meta;

const Template: Story<MeetinsUiSharedProps> = (args) => (
  <MeetinsUiShared {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
