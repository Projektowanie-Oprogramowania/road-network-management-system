import { Fee } from 'Screens/FeesWindow/Logic/FeesLogic';
import { Segment } from 'Screens/InfrastructureWindow/Logic/SegmentLogic';

export interface Subscription {
    id: number;
    charge: Fee;
    description: string;
    endDate: Date;
    segments: Segment[];
    startDate: Date;
    userID: number;
}

export interface SubscriptionDTO {
    charge: Fee;
    description: string;
    endDate: Date;
    segments: Segment[];
    startDate: Date;
    userID: number;
}

export {};
