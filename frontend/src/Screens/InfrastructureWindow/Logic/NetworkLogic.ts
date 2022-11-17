import { IRoadNetwork, INetwork } from './Interfaces';
import { getPoints } from './PointLogic';

import { getRoads } from './RoadLogic';

let networks = [
    {
        name: 'Siec1',
        startingNode: 'Warszawa',
        endingNode: 'Bydgoszcz',
    },
    {
        name: 'Siec2',
        startingNode: 'Warszawa',
        endingNode: 'Kraków',
    },
    {
        name: 'Siec3',
        startingNode: 'Warszawa',
        endingNode: 'Gdańsk',
    },
];

export const getNetworks: () => Array<IRoadNetwork> = () => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    return networks;
};

//TODO nie iwem czy number czy string
export const getNetwork = async (id: number) => {
    //Send request to delete point
    console.log(`Requested to get networks ${id}`);

    const resR = await getRoads();
    const resP = await getPoints();

    let network = {
        network: {
            name: 'Siec1',
            startingNode: 'Warszawa',
            endingNode: 'Bydgoszcz',
        },
        roads: resR.value,
        points: resP.value,
    };

    return network;
};
