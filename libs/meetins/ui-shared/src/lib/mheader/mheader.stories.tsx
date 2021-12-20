import { Story, Meta } from '@storybook/react';
import { MHeader, MHeaderProps } from './mheader';

export default {
  component: MHeader,
  title: 'MHeader',
} as Meta;

const Template: Story<MHeaderProps> = (args) => <MHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Sample Title',
};
