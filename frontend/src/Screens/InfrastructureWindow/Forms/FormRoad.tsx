import React from "react";
import { Road } from '../Logic/Interfaces';
import { Button, TextField } from '@mui/material';

interface IForm {
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    onDelete?: (id: string) => void,
    data?: Road
}

  export const FormRoad = (props: IForm) => {
    const { data, onDelete, onSubmit } = props;
    return (
        <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', width: 400, gap: 10, margin: 10}}>
            {onDelete && data?.id && <Button variant="contained" color="error" onClick={() => onDelete(data.id ? data.id : '')}>Delete Point</Button>}        
            <TextField id="outlined-basic" sx={{ label: { color: 'white'}, input: { color: 'white' } }} label="starting point" variant="outlined"  type='text' defaultValue={data?.startingPointId}/>
            <TextField id="outlined-basic" sx={{ label: { color: 'white'}, input: { color: 'white' } }} label="ending point" variant="outlined"  type='text' defaultValue={data?.endingPointId}/>
            <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
      </form>
    )
  };