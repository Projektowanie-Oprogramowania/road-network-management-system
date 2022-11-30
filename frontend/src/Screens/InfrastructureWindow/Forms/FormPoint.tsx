import React from 'react';
import { Point } from '../Logic/Interfaces';
import { Button, TextField } from '@mui/material';
import useAlert from '@context/useAlert';
import { addPoint, editPoint, removePoint } from '../Logic/NodeLogic';

interface IFormPoint {
    data?: Point;
    callback?: (id: string) => void;
    onReturn: () => void;
}

export const FormPoint = (props: IFormPoint) => {
    const { data, callback, onReturn } = props;
    const { setAlert } = useAlert();

    const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const x: number = Number(
            (e.currentTarget[1] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[3] as HTMLInputElement).value,
        );

        let response: {
            message: string;
            value?: Node;
        } = {
            message: `Error`,
            value: undefined,
        };
        if (data) {
            const p = editPoint({
                id: data.id,
                x: x,
                y: y,
            });
            setAlert(`edytowano punkt ${data.id}`);
            if (callback) {
                callback(p.id);
            }
        } else {
            const p = addPoint({
                x: x,
                y: y,
            });
            setAlert(`dodano punkt ${p.id}`);
            if (callback) {
                callback(p.id);
            }
        }
    };

    const onDelete = () => {
        if (data) {
            removePoint(data.id);
            setAlert(`usunieto punkt ${data.id}`);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '95%',
                gap: 10,
                margin: 10,
            }}
        >
            {data && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete()}
                >
                    Delete Point
                </Button>
            )}
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
            <Button
                type="submit"
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
