import React from 'react';
import {
    FormControl,
    SelectChangeEvent,
    Select,
    MenuItem,
} from '@mui/material';
import './App.css';

import FullScreenAlert from './components/alert/AlertComponent';

import MainApp from './Dashboards/Dashboard';
//import DriverApp from './Dashboards/DriverDashboard/MenuWindow';
//import WorkerApp from './Dashboards/WorkerDashboard/MenuWindow';

/* Połączono wszystkie widoki użytkowników w jeden główny
interface Application {
    value: number;
    label: string;
    app: React.FunctionComponent;
}

const applicationsTable: Array<Application> = [
    {
        value: 0,
        label: 'Driver Application',
        app: DriverApp,
    },
    {
        value: 1,
        label: 'Worker Application',
        app: WorkerApp,
    },
];
*/

const App = () => {
    const [appid, setAppId] = React.useState(0);

    const handleChangeApp = (
        event: SelectChangeEvent<number>,
        child: React.ReactNode,
    ) => {
        setAppId(event.target.value as number);
    };

    return (
        <div className="App">
            <FullScreenAlert />
            {/* Połączono wszystkie widoki użytkowników w jeden główny
            <div>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={appid}
                        label="Application"
                        onChange={handleChangeApp}
                    >
                        {applicationsTable.map(v => (
                            <MenuItem value={v.value}>{v.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {applicationsTable[appid].app({}, undefined)}
             */}
            <MainApp />
        </div>
    );
};

export default App;
