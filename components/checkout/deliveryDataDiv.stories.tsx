import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import PersonalDataDiv from './personalDataDiv';
import DeliveryDataDiv from './deliveryDataDiv';




export default {
  title: 'Components/Checkout/DeliveryDataDiv',
  component: DeliveryDataDiv,
  argTypes: {
  },
} as ComponentMeta<typeof DeliveryDataDiv>;

const Template: ComponentStory<typeof DeliveryDataDiv> = (args: any) => {
        const { control, handleSubmit, formState: {errors} } = useForm();
        return <DeliveryDataDiv {...args} control = {control} handler = {handleSubmit} errors = {errors}/>;
}


export const Primary = Template.bind({});

