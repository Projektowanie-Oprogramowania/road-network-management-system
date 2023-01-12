import dayjs, { Dayjs } from 'dayjs';

export interface Auction {
    description: string;
    endDate: Dayjs;
    id: string;
    location: string;
    maxPrice: number;
    name: string;
    offerIds: string[];
    state: string;
    winnerId: string;
}

export const AuctionStates = ['ABANDONED', 'OPEN', 'CLOSED'];
export const AuctionStatesTłumacz: { [key: string]: string } = {
    ABANDONED: 'Porzucony',
    OPEN: 'Otwarty',
    CLOSED: 'Zamknięty',
};

export interface AuctionOffer {
    auctionID: string;
    currency: string;
    id: string;
    price: number;
    userName: string;
}

export interface AuctionOfferPOST {
    auctionID: string;
    currency: string;
    price: number;
    userName: string;
}

export interface AuctionPOST {
    description: string;
    endDate: Dayjs;
    location: string;
    maxPrice: number;
    name: string;
}
