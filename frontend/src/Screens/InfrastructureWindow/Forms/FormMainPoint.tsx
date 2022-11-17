import React from 'react';
import { Point } from '../Logic/Interfaces';
import { Button, TextField } from '@mui/material';
import useAlert from '@context/useAlert';

import { addPoint } from '../Logic/PointLogic';

interface IFormPoint {
    onSubmit: (p: Point) => void;
}

export const FormMainPoint = (props: IFormPoint) => {
    const { onSubmit } = props;
    //Konteksty
    const { setAlert } = useAlert();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const id: string = (e.currentTarget[0] as HTMLInputElement).value;
        const x: number = Number(
            (e.currentTarget[2] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[4] as HTMLInputElement).value,
        );
        const response = await addPoint({ id: id, x: x, y: y });

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
                label="id"
                variant="outlined"
                type="text"
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="x"
                variant="outlined"
                type="number"
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="y"
                variant="outlined"
                type="number"
            />
            <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
            >
                Dodaj
            </Button>
        </form>
    );
};
