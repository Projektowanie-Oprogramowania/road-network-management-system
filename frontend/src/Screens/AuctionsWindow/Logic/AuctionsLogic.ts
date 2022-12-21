import { apiUrl } from 'shared/settings';
import { Auction, AuctionOffer, AuctionPOST } from './interface';

export const getAuctions = async () => {
    let auctions: Auction[] = [];
    await fetch(`${apiUrl}/auction`)
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
    await fetch(`${apiUrl}/auction/${id}`)
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

export const addAuction = async (
    data: AuctionPOST,
): Promise<Auction | undefined> => {
    let auction: Auction | undefined = undefined;
    await fetch(`${apiUrl}/auction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
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

export const updateAuction = async (
    data: Auction,
): Promise<Auction | undefined> => {
    let auction: Auction | undefined = undefined;
    await fetch(`${apiUrl}/auction/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data as AuctionPOST),
    })
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

export const closeAuction = async (
    id: string,
): Promise<Auction | undefined> => {
    let auction: Auction | undefined = undefined;
    await fetch(`${apiUrl}/auction/close/${id}`, {
        method: 'PUT',
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
            auction = r;
        });

    return auction;
};
