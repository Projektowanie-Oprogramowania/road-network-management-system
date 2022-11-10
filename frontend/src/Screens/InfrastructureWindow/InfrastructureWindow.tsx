import React from "react"

import { FormComponent } from '../../components/forms/Form';
import { FormPoint } from './Forms/FormPoint';
import { FormRoad } from './Forms/FormRoad';
import { Graph, mapConfig } from './Map';

import { getInfrastructure, addPoint, editPoint, removePoint } from './Logic/InfrastructureLogic';

import {Button, Box} from '@mui/material';

import './InfrastructureStyles.css';
import { Point } from "./Logic/Interfaces";

const mapData = getInfrastructure();

export const InfrastructureWindow = () => {

    const [formIsActive, setFormIsActive] = React.useState(false);
    const [formId, setFormId] = React.useState(0);

    const [currentPoint, setCurrentPoint] = React.useState<Point | undefined>(undefined);

    const [data, setData] = React.useState({
        nodes: mapData.points.map(v => ({
              id: v.id,
              x: v.x,
              y: v.y
          })),
        links: mapData.roads.map(v => ({ source: v.startingPointId, target: v.endingPointId }))
      });

    const onSubmitPoint: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const id = (event.currentTarget[0] as HTMLInputElement).value;
        const x = Number((event.currentTarget[1] as HTMLInputElement).value);
        const y = Number((event.currentTarget[2] as HTMLInputElement).value);
        setData({
            nodes: [...data.nodes, {id: id, x: x, y: y}],
            links: [...data.links, {source: 'Warszawa', target: id}]
        })
    }

    const onSubmitInfrastructure: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const id = (event.currentTarget[0] as HTMLInputElement).value;
        const x = Number((event.currentTarget[1] as HTMLInputElement).value);
        const y = Number((event.currentTarget[2] as HTMLInputElement).value);
        setData({
            nodes: [...data.nodes, {id: id, x: x, y: y}],
            links: data.links
        })
    }

    const onClickNode = function(nodeId: any) {
        console.log(`Wybrano punkt ${nodeId}`);

        setFormIsActive(true);
        setFormId(4);
        setCurrentPoint(data.nodes.filter(v => v.id === nodeId)[0]);
    };
    
    const onClickLink = function(source: any, target: any) {
        window.alert(`Wybrano droge ${source} - ${target}`);
    };


    return <div>
        <div style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
            {/* W tym elemencie będą wyświetlane formularze */} 
            {formIsActive && 
                <div className='fill-window'>
                    <div className="form-overlay"/>
                    <div className="form-container">
                        <Box sx={{ p: 10, border: '1px dashed grey', gap: 1 }}>
                            <Button variant="contained" onClick={() => setFormIsActive(false)}>Close</Button>
                            {formId === 0 && <FormPoint onSubmit={addPoint} />}
                            {formId === 4 && <FormPoint onSubmit={editPoint} onDelete={removePoint} data={currentPoint}/>}
                            {formId === 1 && <FormRoad onSubmit={onSubmitInfrastructure} />}
                        </Box>
                    </div>
                </div>
            }
            <div style={{width: 520, display: 'flex', flexDirection: 'column', gap: 40, margin: 40, marginRight: 0}}>
                <div style={{height: 40}}/>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(4);}}>Add Infrastructure Object</Button>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(4);}}>Add City</Button>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(4);}}>Add Point</Button>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(4);}}>Add Road</Button>
                <div style={{height: 40}}/>
            </div>
            <div style={{margin: 40}}>
                <Graph
                    id="graph-id" // id is mandatory
                    data={data}
                    config={mapConfig}
                    onClickNode={onClickNode}
                    onClickLink={onClickLink}
                />
            </div>
        </div>
    </div>
}