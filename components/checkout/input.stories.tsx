import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './input';
import { useForm } from 'react-hook-form';


export default {
  title: 'Components/Checkout/Input',
  component: Input,
  argTypes: {
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: any) => {
        const { control } = useForm();
        return <Input {...args} control = {control}/>;
}


export const Primary = Template.bind({});

Primary.args = ({
    name: "Example",
    type: "text",
    ph: "Example PlaceHolder",
});