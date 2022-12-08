import { Segment } from 'Screens/InfrastructureWindow/Logic/SegmentLogic';
import { apiUrl } from 'shared/settings';

export interface Ride {
    id: string;
    carRegistrationNumber: string;
    chargeID: string;
    endDate: Date;
    segments: Segment;
    startDate: Date;
}

export interface RideFormDTO {
    carRegistrationNumber: string;
    chargeID: string;
    endDate: Date;
    segments: string[];
    startDate: Date;
}

export const addRide = async (ride: RideFormDTO): Promise<Ride | undefined> => {
    let res: Ride | undefined = undefined;
    await fetch(`${apiUrl}/ride`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ride),
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
