import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import PersonalDataDiv from './personalDataDiv';




export default {
  title: 'Components/Checkout/PersonalDataDiv',
  component: PersonalDataDiv,
  argTypes: {
  },
} as ComponentMeta<typeof PersonalDataDiv>;

const Template: ComponentStory<typeof PersonalDataDiv> = (args: any) => {
        const { control, handleSubmit, formState: {errors} } = useForm();
        return <PersonalDataDiv {...args} control = {control} handler = {handleSubmit} errors = {errors}/>;
}


export const Primary = Template.bind({});

