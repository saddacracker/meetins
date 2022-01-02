import { Story, Meta } from '@storybook/react';
import { MUserListItem, MUserListItemProps } from './muser-list-item';

export default {
  component: MUserListItem,
  title: 'MUserListItem',
} as Meta;

const Template: Story<MUserListItemProps> = (args) => (
  <MUserListItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  id: '69',
  name: 'Fart Machine',
  email: 'farting@home.today',
};
