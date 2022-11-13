import React from "react"

import { FormComponent } from '../../components/form/Form';
import { FormPoint } from './Forms/FormPoint';
import { FormRoad, FormRoadSelect } from './Forms/FormRoad';
import { Graph, mapConfig } from './Map';

import { getInfrastructure, addRoad, addPoint, editPoint, removePoint, editRoad, removeRoad, getNetworks } from './Logic/InfrastructureLogic';
import { Point, Road, IRoadNetwork } from "./Logic/Interfaces";

import { Button, Box } from '@mui/material';

import './InfrastructureStyles.css';
import { Paper } from "@mui/material";

import { SimpleComponent } from '@components/lists/simpleComponent';
import { margin } from "@mui/system";


export const InfrastructureWindow = () => {

    const [formIsActive, setFormIsActive] = React.useState(false);
    const [formId, setFormId] = React.useState(0);

    const [currentPoint, setCurrentPoint] = React.useState<Point | undefined>(undefined);
    const [currentRoad, setCurrentRoad] = React.useState<Road | undefined>(undefined);
    const [currentNetwork, setCurrentNetwork] = React.useState<IRoadNetwork | undefined>(undefined);

    const [roadNetworks, setRoadNetworks] = React.useState<Array<IRoadNetwork>>(getNetworks());

    const mapData = getInfrastructure();
    const {data} = React.useMemo(() => ({data: {
        nodes: mapData.points.map(v => ({
              index: v.index,
              id: v.id,
              x: v.x,
              y: v.y
          })),
        links: mapData.roads.filter(
                v =>  mapData.points.findIndex(p => p.id === v.startingPointId) != -1 && mapData.points.findIndex(p => p.id === v.endingPointId) != -1
                ).map(v => (
            {
                id: v.id, 
                source: v.startingPointId, 
                target: v.endingPointId,
                length: v.length, 
                region: v.region
            }))
      }}), [mapData]);

    const onClickNode = function(nodeId: any) {
        console.log(`Wybrano punkt ${nodeId}`);

        setFormIsActive(true);
        setFormId(4);
        setCurrentPoint(data.nodes.filter(v => v.id === nodeId)[0]);
    };
    
    const onClickLink = function(source: any, target: any) {
        console.log(`Wybrano droge ${source} - ${target}`);

        setFormIsActive(true);
        setFormId(5);
        const link = data.links.filter(v => v.source === source && v.target === target)[0];
        setCurrentRoad({
            id: link.id,
            startingPointId: link.source,
            endingPointId: link.target,
            length: link.length,
            region: link.region,
        });
    };

    const ControlListPanel = () => {
        return <>
            <Box sx={{height: '95%'}}>
                { (roadNetworks.length > 0 && <div>{
                    roadNetworks.map((v, i) => <SimpleComponent id={i} label={`${v.name}(${v.startingNode}-${v.endingNode})`} choosen={currentNetwork == v} onChoose={() => {
                        console.log(`wybrano wezel ${v}`);
                        setCurrentNetwork(v);
                    }}/>)
                    }</div>
                    ) || <div>Brak sieci drogowych</div>
                }
            </Box>
            <Box sx={{height: '5%', justifyContent: 'center', display: 'flex', width: '100%'}}><Button variant="contained">Dodaj sieć drogowa</Button></Box>
        </>
    }


    return <div>
        <div style={{display:'flex', position: 'relative', flexDirection: 'row', alignItems: 'center', height: '960px'}}>
            {/* W tym elemencie będą wyświetlane formularze */} 
            {formIsActive && 
                <div className='fill-window'>
                    <div className="form-overlay"/>
                    <div className="form-container">
                        <Box sx={{ p: 10, border: '1px dashed grey', gap: 1 }}>
                            <Button variant="contained" onClick={() => setFormIsActive(false)}>Close</Button>
                            {formId === 0 && <FormPoint onSubmit={addPoint} />}
                            {formId === 4 && <FormPoint onSubmit={editPoint} onDelete={removePoint} data={currentPoint}/>}
                            {formId === 1 && <FormRoadSelect points={data.nodes.map(v => v.id)} onSubmit={addRoad} />}
                            {formId === 5 && <FormRoadSelect points={data.nodes.map(v => v.id)} onSubmit={editRoad} onDelete={removeRoad} data={currentRoad}/>}
                        </Box>
                    </div>
                </div>
            }
            {/* 
            <div style={{width: 520, display: 'flex', flexDirection: 'column', gap: 40, margin: 40, marginRight: 0}}>
                <div style={{height: 40}}/>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(0);}}>Add Infrastructure Object</Button>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(0);}}>Add City</Button>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(0);}}>Add Point</Button>
                <Button variant="contained" onClick={() => {setFormIsActive(true); setFormId(1);}}>Add Road</Button>
                <div style={{height: 40}}/>
            </div>
            */}
            <Paper style={{padding: 30, margin: 20, width: '80%', height: '90%'}}>
                { (currentNetwork &&
                    <Graph
                        id="graph-id" // id is mandatory
                        data={data}
                        config={mapConfig}
                        onClickNode={onClickNode}
                        onClickLink={onClickLink}
                    />
                ) || 
                    <Box sx={{width: mapConfig.width, height: mapConfig.height, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        Wybierz sieć drogową z listy obok aby ją edytować
                    </Box>
                }
            </Paper>
            <Paper style={{display: 'flex', flexDirection: 'column', padding: 30, margin: 20, width: '80%', height: '90%'}}>
                <ControlListPanel />
            </Paper>
        </div>
    </div>
}