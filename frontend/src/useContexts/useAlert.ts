import { useContext } from 'react';
import AlertContext from '../components/alert/AlertProvider';

const useAlert = () => useContext(AlertContext);

export default useAlert;
export {};