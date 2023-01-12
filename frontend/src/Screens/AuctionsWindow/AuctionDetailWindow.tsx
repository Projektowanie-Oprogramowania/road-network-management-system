import useAlert from '@context/useAlert';
import { useRole } from '@context/useRole';
import { Box, Button, Paper, TextField } from '@mui/material';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { json } from 'stream/consumers';
import { getAuctionById } from './Logic/AuctionsLogic';
import { getOfferByAuctionId, getOfferById } from './Logic/OfferLogic';
import { Auction, AuctionOffer } from './Logic/interface';
import { Dayjs } from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReturnButton } from 'shared/ReturnButton';

export const AuctionDetailWindow = () => {
    const { id } = useParams();
    const { role, userId } = useRole();
    const navigate = useNavigate();
    const [infoText, setInfoText] = useState('Ładowanie danych...');

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<Auction>();
    const [winner, setWinner] = useState<AuctionOffer>();
    const [offers, setOffers] = useState<AuctionOffer[]>([]);

    const updateData = async () => {
        setLoading(true);
        if (!id) {
            setInfoText('Błąd id przetargu');
            return;
        }
        const r = await getAuctionById(id);
        const o = await getOfferByAuctionId(id);
        if (r && o) {
            if (r.winnerId) {
                const w = await getOfferById(r.winnerId);
                if (w) {
                    setWinner(w);
                }
            }
            setData(r);
            setOffers(o);
            setLoading(false);
        } else {
            setInfoText(`Błąd pobierania danych o przetargu ${id}`);
        }
    };

    useEffect(() => {
        updateData();
    }, [id]);

    const isAdmin = role === 'admin';

    const renderWinningOffer = () => {
        if (winner)
            return (
                <Box
                    sx={{
                        backgroundColor: 'rgb(45, 45, 45)',
                    }}
                >
                    <Box>{winner.userName}</Box>
                    <Box>
                        {winner.price} {winner.currency}
                    </Box>
                </Box>
            );
        else {
            return (
                <Box
                    sx={{
                        backgroundColor: 'rgb(45, 45, 45)',
                    }}
                >
                    Brak zwycięzcy
                </Box>
            );
        }
    };

    const renderOfferList = () =>
        offers.map(v => (
            <Box
                sx={{
                    backgroundColor: 'rgb(45, 45, 45)',
                }}
            >
                <Box>{v.userName}</Box>
                <Box>
                    {v.price} {v.currency}
                </Box>
            </Box>
        ));

    const renderUserOffer = () => (
        <>
            <Box>Twoje oferty</Box>

            {offers
                .filter(v => v.userName == userId)
                .map(v => (
                    <Box
                        sx={{
                            backgroundColor: 'rgb(45, 45, 45)',
                        }}
                    >
                        <Box>{v.userName}</Box>
                        <Box>
                            {v.price} {v.currency}
                        </Box>
                    </Box>
                ))}
        </>
    );

    const renderUserOfferWinning = () =>
        winner && winner.userName == userId ? (
            <>
                <Box>Twoja oferta wygrała</Box>
                {renderWinningOffer()}
            </>
        ) : (
            <>
                <Box>Przetarg został zamknięty</Box>
                <Box>Nie wygrałeś przetargu</Box>
            </>
        );

    return (
        <Box
            sx={{
                display: 'flex',
                margin: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '50px',
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Paper
                    sx={{
                        width: '700px',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    elevation={6}
                >
                    <TextField
                        id="outlined-basic"
                        label="Numer Przetargu"
                        variant="outlined"
                        autoComplete="off"
                        value={data?.id}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Nazwa"
                        variant="outlined"
                        autoComplete="off"
                        value={data?.name}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Lokalizacja"
                        variant="outlined"
                        autoComplete="off"
                        value={data?.location}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Opis infrastruktury"
                        variant="outlined"
                        autoComplete="off"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        value={data?.description}
                        sx={{ width: '50%' }}
                    />
                    <DesktopDatePicker
                        label="Data zakończenia przetargu"
                        inputFormat="MM/DD/YYYY"
                        value={data?.endDate}
                        readOnly={true}
                        renderInput={params => <TextField {...params} />}
                        onChange={function (
                            value: Dayjs | null | undefined,
                            keyboardInputValue?: string | undefined,
                        ): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Cena wywoławcza"
                        variant="outlined"
                        autoComplete="off"
                        type="number"
                        value={data?.maxPrice}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '50%' }}
                    />
                    <Box sx={{ display: 'flex', gap: '30px' }}>
                        <ReturnButton />
                        {isAdmin ? (
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => navigate('./edit')}
                            >
                                Edycja
                            </Button>
                        ) : data?.state && data.state === 'OPEN' ? (
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => navigate('./offer')}
                            >
                                Złóż ofertę
                            </Button>
                        ) : (
                            <Box>Przetarg zakończył się</Box>
                        )}
                    </Box>
                </Paper>
                <Paper
                    sx={{
                        width: '700px',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    elevation={6}
                >
                    {offers.length > 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            {data?.state && data.state === 'OPEN' ? (
                                isAdmin ? (
                                    <>
                                        <Box>Lista zgłoszeń do przetargu</Box>
                                        {renderOfferList()}
                                    </>
                                ) : (
                                    <>{renderUserOffer()}</>
                                )
                            ) : data?.state && data.state === 'CLOSED' ? (
                                isAdmin ? (
                                    <>
                                        <Box>Zwycięzca przetargu</Box>
                                        {renderWinningOffer()}
                                    </>
                                ) : (
                                    <>{renderUserOfferWinning()}</>
                                )
                            ) : (
                                <>
                                    <Box>Przetarg porzucono</Box>
                                </>
                            )}
                        </Box>
                    ) : (
                        <Box>
                            {loading
                                ? 'Ładowanie danych...'
                                : 'Brak zgłoszeń do przetargu'}
                        </Box>
                    )}
                </Paper>
            </LocalizationProvider>
        </Box>
    );
};
