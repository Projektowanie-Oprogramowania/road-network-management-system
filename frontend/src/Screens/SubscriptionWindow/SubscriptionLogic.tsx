import { apiUrl } from 'shared/settings';

export interface Subscription {
    id: string;
    chargeId : string;
    description : string;
    startDate : Date;
    endDate : Date;
}

export const getSubscriptionsByUserID = async (id: string) => {
    let subscriptions: Subscription[] = [];
    await fetch(`${apiUrl}/subscription/user/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(r => {
            subscriptions = r;
        });

    return subscriptions;
};
