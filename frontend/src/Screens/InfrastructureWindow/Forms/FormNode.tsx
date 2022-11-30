import React from 'react';
import { Node } from '../Logic/Interfaces';
import { Button, TextField } from '@mui/material';
import useAlert from '@context/useAlert';

import { addNode, editNode } from '../Logic/NodeLogic';

interface IFormPoint {
    isCity?: boolean;
    data?: Node;
    onSubmit: (p: Node) => void;
    onReturn: () => void;
}

export const FormNode = (props: IFormPoint) => {
    const { isCity, data, onSubmit, onReturn } = props;
    const { setAlert } = useAlert();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const name: string = (e.currentTarget[0] as HTMLInputElement).value;
        const x: number = Number(
            (e.currentTarget[2] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[4] as HTMLInputElement).value,
        );

        let response: {
            message: string;
            value?: Node;
        } = {
            message: `Error`,
            value: undefined,
        };

        if (data) {
            const node = await editNode({
                id: data.id,
                isCity: data.isCity,
                name: name,
                x: x,
                y: y,
            });
            response = {
                message: `Edytowano punkt ${name}`,
                value: node,
            };
        } else {
            const node = addNode({
                isCity: isCity === true,
                name: name,
                x: x,
                y: y,
            });
            response = {
                message: `Utworzono punkt ${name}`,
                value: node,
            };
        }

        setAlert(response.message);
        if (response.value) {
            onSubmit(response.value);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: 400,
                gap: 10,
                margin: 10,
            }}
        >
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="name"
                variant="outlined"
                type="text"
                autoComplete="off"
                defaultValue={data?.name}
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="x"
                variant="outlined"
                type="number"
                autoComplete="off"
                defaultValue={data?.x}
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="y"
                variant="outlined"
                type="number"
                autoComplete="off"
                defaultValue={data?.y}
            />
            <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
            >
                {data ? 'Zapisz' : 'Dodaj'}
            </Button>
            <Button
                value="Submit"
                variant="contained"
                color="error"
                onClick={onReturn}
            >
                Anuluj
            </Button>
        </form>
    );
};