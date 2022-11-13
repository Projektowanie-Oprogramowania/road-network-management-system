import { NavigateWindow } from '../../Screens/NavigationWindow/NavigationWindow';
import { IncidentsWindow } from '../../Screens/IncidentWindow/IncidentWindow';

export const screenList = [
    {
        label: 'Navigation',
        path: 'navigate',
        element: NavigateWindow,
    },
    {
        label: 'Incidents',
        path: 'incidents',
        element: IncidentsWindow,
    },
];
