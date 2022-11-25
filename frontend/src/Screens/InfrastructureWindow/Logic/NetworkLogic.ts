import { IRoadNetwork } from './Interfaces';

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
