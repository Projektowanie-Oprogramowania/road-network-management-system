import './App.css';

import FullScreenAlert from './components/alert/AlertComponent';

import MainApp from './Dashboards/Dashboard';


const App = () => {

    return (
        <div className="App">
            <FullScreenAlert />
            <MainApp />
        </div>
    );
};

export default App;
