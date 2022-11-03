import React from 'react';
import './App.css';

import DriverApp from './Dashboards/DriverDashboard/MenuWindow';
import WorkerApp from './Dashboards/WorkerDashboard/MenuWindow';

const App = () => {
  return (
    <div className="App">
      <DriverApp />
      <WorkerApp />
    </div>
  );
}

export default App;
