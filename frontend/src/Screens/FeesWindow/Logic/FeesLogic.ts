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

export interface FeeFormDTO {
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

export const getChargeByID = async (id: string): Promise<Fee | undefined> => {
    let fees: Fee | undefined = undefined;
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

export const addCharge = async (fee: FeeFormDTO): Promise<Fee | undefined> => {
    let res: Fee | undefined = undefined;
    await fetch(`${apiUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fee),
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

export const gemerateCharge = async (
    type: string,
    desc: string,
): Promise<Fee | undefined> => {
    const fee: FeeFormDTO = {
        amount: Math.random() * 1000,
        chargeType: type,
        date: new Date((new Date() as any) - Math.random() * 1e12),
        description: desc,
        paid: false,
        userID: 0,
    };
    let res: Fee | undefined = undefined;
    await fetch(`${apiUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fee),
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

export const editCharge: (fee: Fee) => Promise<Fee | undefined> = async (
    fee: Fee,
) => {
    let res: Fee | undefined = undefined;
    await fetch(`${apiUrl}/${fee.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: fee.amount,
            chargeType: fee.chargeType,
            date: fee.date,
            description: fee.description,
            paid: fee.paid,
            userID: fee.userID,
        }),
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

export const removeFee: (id: string) => Promise<boolean> = async (
    id: string,
) => {
    const res: boolean = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.ok;
    });
    return res;
};
