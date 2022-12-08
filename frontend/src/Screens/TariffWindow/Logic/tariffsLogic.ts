import { apiUrl } from 'shared/settings';
import { Terifficator, TerifficatorFormDTO } from './interfaces';

export const addTerifficator = async (
    teriff: TerifficatorFormDTO,
): Promise<Terifficator | undefined> => {
    let res: Terifficator | undefined = undefined;
    await fetch(`${apiUrl}/tariff`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teriff),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            res = r;
        });

    return res;
};

export const editTerifficator: (
    teriff: Terifficator,
) => Promise<Terifficator | undefined> = async (teriff: Terifficator) => {
    let res: Terifficator | undefined = undefined;
    await fetch(`${apiUrl}/tariff/${teriff.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teriff),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            res = r;
        });

    return res;
};

export const getTerifficator: (
    id: string,
) => Promise<Terifficator | undefined> = async (id: string) => {
    let res: Terifficator | undefined = undefined;
    await fetch(`${apiUrl}/tariff/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            res = r;
        });

    return res;
};

export const removeTerifficator: (id: string) => Promise<boolean> = async (
    id: string,
) => {
    const res: boolean = await fetch(`${apiUrl}/tariff/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.ok;
    });
    return res;
};
