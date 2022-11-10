import React from "react";
import { Road } from '../Logic/Interfaces';

interface IFormPoint {
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    data?: Road
}


/*
export interface Road {
    startingPointId: string,
    endingPointId: string,
    length: number,
}
*/

export const FormRoad = (props: IFormPoint) => {
    return (
        <form onSubmit={props.onSubmit}>        
            <label>starting point<input type='text' defaultValue={props.data?.startingPointId}/></label>
            <label>ending point<input type='text' defaultValue={props.data?.endingPointId}/></label>
        <input type="submit" value="Submit" />
      </form>
    )
  };