import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import PaymentDataDiv from './paymentDataDiv';




export default {
  title: 'Components/Checkout/PaymentDataDiv',
  component: PaymentDataDiv,
  argTypes: {
  },
} as ComponentMeta<typeof PaymentDataDiv>;

const Template: ComponentStory<typeof PaymentDataDiv> = (args: any) => {
        const { control, handleSubmit, formState: {errors}, watch } = useForm();
        return <PaymentDataDiv {...args} control = {control} handler = {handleSubmit} errors = {errors} watch = {watch}/>;
}


export const Primary = Template.bind({});

