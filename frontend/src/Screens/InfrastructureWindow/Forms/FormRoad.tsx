import React, { useState } from 'react';
import { Road, Point } from '../Logic/Interfaces';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    makeStyles,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { useStateManager } from 'react-select';

interface IForm {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onDelete?: (id: number) => void;
    data?: Road;
}

export const FormRoad = (props: IForm) => {
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
            {onDelete && data?.id !== undefined && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(data.id ? Number(data.id) : 0)}
                >
                    Delete Point
                </Button>
            )}
            <input id="index" type="hidden" value={data?.id} />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="starting point"
                variant="outlined"
                type="text"
                defaultValue={data?.startingPoint}
            />
            <TextField
                id="outlined-basic"
                sx={{ label: { color: 'white' }, input: { color: 'white' } }}
                label="ending point"
                variant="outlined"
                type="text"
                defaultValue={data?.endingPoint}
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

/*
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  */

const style = {
    color: 'white',
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '.MuiSvgIcon-root ': {
        fill: 'white !important',
    },
};

interface IFormSelect {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onDelete?: (id: string) => void;
    data?: Road;
    points: string[];
}

export const FormRoadSelect = (props: IFormSelect) => {
    const { data, points, onDelete, onSubmit } = props;
    const [p, setP] = useState(true);
    const [pr, setPr] = useState(0);

    const changePrice: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
        setPr(Number(e.target.value));
    };

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
            {points.length > 1 ? (
                <>
                    {onDelete && data?.id !== undefined && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => onDelete(data.id ? data.id : '')}
                        >
                            Delete Point
                        </Button>
                    )}
                    <input id="index" type="hidden" value={data?.id} />
                    <Select
                        labelId="demo-simple-select-label"
                        sx={style}
                        id="demo-simple-select"
                        label="Starting Point"
                        defaultValue={data?.startingPoint}
                    >
                        {points.map(v => (
                            <MenuItem value={v}>{v}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        labelId="demo-simple-select-label"
                        sx={style}
                        id="demo-simple-select"
                        label="Ending Point"
                        defaultValue={data?.endingPoint}
                    >
                        {points.map(v => (
                            <MenuItem value={v}>{v}</MenuItem>
                        ))}
                    </Select>
                    <FormControlLabel
                        control={<Checkbox onChange={(e, c) => setP(c)} />}
                        label="odcinek płatny"
                    />
                    {p && (
                        <TextField
                            id="outlined-basic"
                            sx={{
                                label: { color: 'white' },
                                input: { color: 'white' },
                            }}
                            label="cena"
                            variant="outlined"
                            type="number"
                            defaultValue={pr ? pr : 0}
                            onChange={changePrice}
                        />
                    )}
                    <Button
                        type="submit"
                        value="Submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </>
            ) : (
                <>
                    <div>Not Enough Points To Connect them with road</div>
                </>
            )}
        </form>
    );
};
