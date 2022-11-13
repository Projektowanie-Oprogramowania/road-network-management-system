import { type } from 'os';
import React from 'react';

interface IForm {
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    fields: Array<{
        name: string;
        type: string;
        value: string | number;
    }>;
}

export const FormPoint = (props: IForm) => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.fields.map(v => (
                <label>
                    {v.name}
                    <input type={v.type} value={v.value} />
                </label>
            ))}
            <input type="submit" value="Submit" />
        </form>
    );
};
