import React from "react";
import { Point } from '../Logic/Interfaces';
import { Button } from '@mui/material';

interface IFormPoint {
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    onDelete?: (id: string) => void,
    data?: Point
}

export const FormPoint = (props: IFormPoint) => {
    const { data, onDelete, onSubmit } = props;
    console.log(data);
    console.log(onDelete);
    console.log(onSubmit);
    return (
        <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', width: 400, gap: 10, margin: 10}}>
            {onDelete && data?.id && <Button variant="contained" color="error" onClick={() => onDelete(data?.id)}>Delete Point</Button>}        
            <label>id<input type='text' defaultValue={data?.id} /></label>
            <label>x<input type='number' defaultValue={data?.x} /></label>
            <label>y<input type='number' defaultValue={data?.y} /></label>
            <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
      </form>
    )
  };