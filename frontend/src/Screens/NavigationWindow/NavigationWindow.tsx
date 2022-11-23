import React, { useEffect, useState } from 'react';
import useFetch from 'use-fetch';
import { FormComponent } from '../../components/form/Form';
import { Point } from '../InfrastructureWindow/Logic/Interfaces';

/*
const points: Point[] = [
    { 
        id: "Warszawa",
        x: 52.221650,
        y: 21.006234
        
    }, { 
        id: "Gdynia",
        x: 54.518304, 
        y: 18.523223
    }, { 
        id: "Krakow",
        x: 50.061265, 
        y: 19.947009
    }];
*/

const onSubmitDirection: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const point_1 = (event.currentTarget[0] as HTMLInputElement).value;
    const point_2 = (event.currentTarget[1] as HTMLInputElement).value;
    //const p = points.find(x => x.id === id);
    if (point_1 != null && point_2 != null) {
        window.open(
            'https://maps.google.com/maps/dir/' + point_1 + '/' + point_2,
        );
    } else {
        window.alert('Nie znaleziono Id!');
    }
};

const IdForm = [
    {
        name: 'navigate from',
        type: 'text',
    },
    {
        name: 'navigate to',
        type: 'text',
    },
];

let sendRequest = false;

export const NavigateWindow = () => {
    // REQUEST EXAMPLE
    const { sendRequest: fetchInfrastructure } = useFetch();

    useEffect(() => {
        const handleRespnse = (response: any) => {
            console.log(response);
        }
    
        const fetchInfrastructureRequest = {
            url: `infrastructure`
        }
    
        fetchInfrastructure(fetchInfrastructureRequest, handleRespnse);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
    <div>
        <div style={{ height: 40 }} />
        <FormComponent onSubmit={onSubmitDirection} fields={IdForm} />
        <div style={{ height: 40 }} />
    </div>
    );
}
