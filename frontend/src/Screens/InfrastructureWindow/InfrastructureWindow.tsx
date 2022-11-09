import React from "react"

import { FormComponent } from '../../components/forms/Form';
import { FormPoint } from './Forms/FormPoint';
import { FormRoad } from './Forms/FormRoad';
import { Graph, mapConfig, onClickLink, onClickNode } from './Map';

import { getInfrastructure, addPoint, editPoint, removePoint } from './Logic/InfrastructureLogic';

import {Button, Box} from '@mui/material';

import './InfrastructureStyles.css';

const PointForm = [
    { 
        name: 'id',
        type: 'text'
    }, { 
        name: 'x',
        type: 'number',
    }, { 
        name: 'y',
        type: 'number',
    },
]

const InfrastructureForm = [
    { 
        name: 'id',
        type: 'text'
    }, { 
        name: 'x',
        type: 'number',
    }, { 
        name: 'y',
        type: 'number',
    },
]

const mapData = getInfrastructure();

export const InfrastructureWindow = () => {

    const [formIsActive, setFormIsActive] = React.useState(false);
    const [formId, setFormId] = React.useState(0);

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
                            {formId === 1 && <FormRoad onSubmit={onSubmitInfrastructure} fields={InfrastructureForm} />}
                        </Box>
                    </div>
                </div>
            }
            <div style={{width: 520, display: 'flex', flexDirection: 'column', gap: 40, margin: 40, marginRight: 0}}>
                <div style={{height: 40}}/>
                <Button variant="contained" onClick={() => setFormIsActive(true)}>Add Infrastructure Object</Button>
                <Button variant="contained" onClick={() => setFormIsActive(true)}>Add City</Button>
                <Button variant="contained" onClick={() => setFormIsActive(true)}>Add Point</Button>
                <Button variant="contained" onClick={() => setFormIsActive(true)}>Add Road</Button>
                {/*
                    <FormComponent onSubmit={onSubmitPoint} fields={PointForm} />
                    <FormComponent onSubmit={onSubmitInfrastructure} fields={InfrastructureForm} />
                */}
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