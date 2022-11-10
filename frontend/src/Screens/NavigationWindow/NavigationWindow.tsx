import React from "react"
import { FormComponent } from '../../components/form/Form';
import { Point } from "../InfrastructureWindow/Interfaces";

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
    

const onSubmitDirection: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const id = (event.currentTarget[0] as HTMLInputElement).value;
    const p = points.find(x => x.id === id);
    if(p!=null) {
        window.open("https://maps.google.com?q=" + p.x + "," + p.y );
    }
    else {
        window.alert("Nie znaleziono Id!")
    }
}

const IdForm = [
{
    name: 'navigate to',
    type: 'text'
}]

export const NavigateWindow = () => 
    <div>
        <div style={{height: 40}}/>
        <FormComponent onSubmit={onSubmitDirection} fields={IdForm} />
        <div style={{height: 40}}/>
    </div>