import {AddItemForm} from "./AddItemForm";
import React from 'react';
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

const callback = action('Button "+" was pressed')
export const BaseExample = () => {
    // @ts-ignore
    return <AddItemForm addItem={callback} />
}