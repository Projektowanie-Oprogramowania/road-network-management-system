import React from "react"

import { FormComponent } from '../../components/form/Form';
import { Graph, mapConfig, onClickLink, onClickNode } from './Map';

import {getInfrastructure} from './InfrastructureLogic';
import { Point } from "./Interfaces";

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
        <FormComponent onSubmit={onSubmitPoint} fields={PointForm} />
        <FormComponent onSubmit={onSubmitInfrastructure} fields={InfrastructureForm} />
        <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={mapConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
        />
    </div>
}