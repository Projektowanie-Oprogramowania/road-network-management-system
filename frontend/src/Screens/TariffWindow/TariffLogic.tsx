import { apiUrl } from 'shared/settings';

export interface Tariff {
    id: string;
    name: string;
    pricesPerKilometer: any[];
}

export const getTariffs: () => Promise<Tariff[]> = async () => {
    let tariffs: Tariff[] = [];
    await fetch(`${apiUrl}/tariff`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            tariffs = r;
        });

    return tariffs;
};
