import { apiUrl } from 'shared/settings';

export interface Region {
    id: string;
    name: string;
}

export const getRegions: () => Promise<Region[]> = async () => {
    let regions: Region[] = [];
    await fetch(`${apiUrl}/region`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            regions = r;
        });

    return regions;
};
