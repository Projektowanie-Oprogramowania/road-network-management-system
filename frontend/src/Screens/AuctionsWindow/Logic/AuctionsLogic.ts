import { apiUrl } from 'shared/settings';
import { Auction, AuctionOffer } from './interface';

export const getAuctions = async (id: string) => {
    let auctions: Auction[] = [];
    await fetch(`${apiUrl}/user/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            auctions = r;
        });

    return auctions;
};

export const getAuctionById = async (
    id: string,
): Promise<Auction | undefined> => {
    let auction: Auction | undefined = undefined;
    await fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            auction = r;
        });

    return auction;
};

/*
export const addCharge = async (fee: FeeFormDTO): Promise<Auction | undefined> => {
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
*/

export const deleteAuction: (id: string) => Promise<boolean> = async (
    id: string,
) => {
    /*const res: boolean = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.ok;
    });
    return res;
    */
    return true;
};
