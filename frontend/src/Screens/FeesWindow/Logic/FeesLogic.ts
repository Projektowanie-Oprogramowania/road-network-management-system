import { apiUrl } from 'shared/settings';

export interface Fee {
    id: number;
    amount: number;
    chargeType: string;
    date: Date;
    description: string;
    paid: boolean;
    userID: number;
}

export const getPaymentsByUserID = async (id: string) => {
    let fees: Fee[] = [];
    await fetch(`${apiUrl}/user/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            fees = r;
        });

    return fees;
};

export const getChargeByID = async (id: string) => {
    let fees: Fee[] = [];
    await fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            fees = r;
        });

    return fees;
};

//addCharge
//updateCharge
//removeCharge
