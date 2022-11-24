import { Region } from './Interfaces';

const regions: Region[] = [
    {
        id: '0',
        name: 'Mazowieckie',
    },
    {
        id: '1',
        name: 'Lubelskie',
    },
    {
        id: '2',
        name: 'Podlaskie',
    },
    {
        id: '3',
        name: 'Świętokrzyskie',
    },
    {
        id: '4',
        name: 'Podkarpackie',
    },
    {
        id: '5',
        name: 'Śląskie',
    },
    {
        id: '6',
        name: 'Wielkopolskie',
    },
    {
        id: '7',
        name: 'Małopolskie',
    },
];

export const addRegion: (s: string) => Region = (s: string) => {
    const r = regions.find(r => r.name === s);
    if (r) {
        return r;
    }
    regions.push({
        id: s,
        name: s,
    });
    return regions[regions.length - 1];
};

export const getRegions: () => Array<Region> = () => {
    //Send request to delete point
    console.log(`Requested to get networks`);

    return regions;
};

export const getRegion: (id: string) => Region = id => {
    const index = regions.findIndex(v => v.id === id);
    return index !== -1
        ? regions[index]
        : {
              id: 'null',
              name: 'null',
          };
};
