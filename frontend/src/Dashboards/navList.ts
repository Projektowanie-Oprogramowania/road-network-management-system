import HomeIcon from '@mui/icons-material/Home';
import PolylineIcon from '@mui/icons-material/Polyline';
import NavigationIcon from '@mui/icons-material/Navigation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import GavelIcon from '@mui/icons-material/Gavel';

export const navList = [
    {
        label: 'Home',
        path: '/',
        image: HomeIcon,
    },
    {
        label: 'Sieci Drogowe',
        path: 'infrastructure',
        image: PolylineIcon,
    },
    {
        label: 'Nawigacja',
        path: 'navigate',
        image: NavigationIcon,
    },
    {
        label: 'Tarryfikatory',
        path: 'tariff',
        image: ReceiptIcon,
    },
    {
        label: 'Opłaty',
        path: 'fees',
        image: AttachMoneyIcon,
    },
    {
        label: 'Wykup abonament',
        path: 'subscription',
        image: LoyaltyIcon,
    },
    {
        label: 'Przetargi',
        path: 'auctions',
        image: GavelIcon,
    },
];
