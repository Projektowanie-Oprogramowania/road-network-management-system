import { apiUrl } from 'shared/settings';
import { AuctionOffer, AuctionOfferPOST } from './interface';

export const getOfferByAuctionId = async (id: string) => {
    let offers: AuctionOffer[] = [];
    await fetch(`${apiUrl}/offer/auction/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            offers = r;
        });

    return offers;
};

export const getOfferById = async (
    id: string,
): Promise<AuctionOffer | undefined> => {
    let offer: AuctionOffer | undefined = undefined;
    await fetch(`${apiUrl}/offer/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            offer = r;
        });

    return offer;
};

export const addOffer = async (
    data: AuctionOfferPOST,
): Promise<AuctionOffer | undefined> => {
    let offer: AuctionOffer | undefined = undefined;
    await fetch(`${apiUrl}/offer`, {
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
            offer = r;
        });

    return offer;
};
