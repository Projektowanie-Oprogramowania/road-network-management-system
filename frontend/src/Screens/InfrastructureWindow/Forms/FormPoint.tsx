import React from 'react';
import { Point } from '../Logic/Interfaces';
import { Button, TextField } from '@mui/material';

interface IFormPoint {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onDelete?: (id: string) => void;
    data?: Point;
}

export const FormPoint = (props: IFormPoint) => {
    const { data, onDelete, onSubmit } = props;
    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: 400,
                gap: 10,
                margin: 10,
            }}
        >
            {onDelete && data?.id && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(data?.id)}
                >
                    Delete Point
                </Button>
            )}
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="id"
                variant="outlined"
                type="text"
                defaultValue={data?.id}
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="x"
                variant="outlined"
                type="number"
                defaultValue={data?.x}
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="y"
                variant="outlined"
                type="number"
                defaultValue={data?.y}
            />
            <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    );
};
