import React, { useState, useEffect } from 'react';
import { Point, Segment } from '../Logic/Interfaces';
import { Box, Button, TextField } from '@mui/material';
import useAlert from '@context/useAlert';
import { addSegment } from '../Logic/SegmentLogic';

interface IForm {
    data?: Segment;
    roadPoints: Point[];
    callback: (s: Segment) => void;
    onReturn: () => void;
}

export const FormSegment = (props: IForm) => {
    const { data, callback, roadPoints, onReturn } = props;
    const { setAlert } = useAlert();

    const [startingPont, setSP] = useState<Point>();
    const [points, setPoints] = useState<Point[]>([]);
    const [endingPoint, setEP] = useState<Point>();
    const [isPaid, setIsPaid] = useState(false);
    const [cost, setCost] = useState(0);

    const [page, setPage] = useState(0);

    useEffect(() => {
        if (data) {
            setSP(data.startingPoint);
            setPoints(data.points);
            setEP(data.endingPoint);
        }
    }, []);

    const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const x: number = Number(
            (e.currentTarget[1] as HTMLInputElement).value,
        );
        const y: number = Number(
            (e.currentTarget[3] as HTMLInputElement).value,
        );
    };

    const onDelete = () => {
        if (data) {
            //removePoint(data.id);
            //setAlert(`usunieto wezel ${data.id}`);
        }
    };

    const handleSubmit = async () => {
        if (startingPont && endingPoint) {
            const res = await addSegment({
                points: points,
                startingPoint: startingPont,
                endingPoint: endingPoint,
                isPaid: isPaid,
                price: cost,
            });
            if (res) {
                setAlert(`Dodano segment id: ${res.id}`);
                callback(res);
            } else {
                setAlert('Wystapil blad przy dodawaniu segmnentu');
            }
        }
    };

    const setStartPoint = (p: Point) => {
        console.log(p);
        setSP(p);
    };

    const setEndPoint = (p: Point) => {
        console.log(p);
        setEP(p);
    };

    const addPoint = (p: Point) => {
        console.log(p);
        setPoints([...points, p]);
    };

    /* Problem z odswiezaniem - rozwiazanie chwilowe trzeba miec wczesjniej dodane punkty
    const handleAddPoint = (p: Point) => {
        if (f) f(p);
    };
    */

    const removePoint = (p: Point) => {
        const _p = [...points];
        setPoints(_p.filter(v => v.id !== p.id));
    };

    const PointList = (callback: (p: Point) => void) => {
        return (
            <>
                {roadPoints.map(p => (
                    <Button
                        onClick={() => {
                            console.log(p);
                            callback(p);
                            setPage(0);
                        }}
                    >
                        {p.id} x:{p.x} y:{p.y}
                    </Button>
                ))}
                {/* Problem z odswiezaniem - rozwiazanie chwilowe trzeba miec wczesjniej dodane punkty
                <Button
                    onClick={() => {
                        setPage(4);
                    }}
                >
                    Dodaj nowy
                </Button>
                */}
            </>
        );
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '90%',
                gap: 10,
                margin: 10,
            }}
        >
            {page === 0 && (
                <>
                    <Box>
                        <Box>Początek drogi</Box>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setPage(1);
                            }}
                            sx={{
                                wordSpacing: '20px',
                            }}
                        >
                            {startingPont
                                ? `ID:${startingPont.id} x:${startingPont.x} y:${startingPont.y}`
                                : 'Wybierz'}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '10px',
                        }}
                    >
                        <Box>Punkty drogi</Box>
                        {points.map(p => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: '25px',
                                }}
                            >
                                <Box
                                    bgcolor="primary"
                                    sx={{
                                        wordSpacing: '10px',
                                    }}
                                >
                                    {`ID:${p.id} x:${p.x} y:${p.y}`}
                                </Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => removePoint(p)}
                                >
                                    X
                                </Button>
                            </Box>
                        ))}
                        <Button
                            variant="contained"
                            onClick={() => {
                                setPage(2);
                            }}
                        >
                            +
                        </Button>
                    </Box>
                    <Box>
                        <Box>Koniec drogi</Box>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setPage(3);
                            }}
                            sx={{
                                wordSpacing: '20px',
                            }}
                        >
                            {endingPoint
                                ? `ID:${endingPoint.id} x:${endingPoint.x} y:${endingPoint.y}`
                                : 'Wybierz'}
                        </Button>
                    </Box>
                    Opłaty
                    <Box>
                        <Button
                            type="submit"
                            value="Submit"
                            variant={isPaid ? 'contained' : 'outlined'}
                            color={isPaid ? 'error' : 'primary'}
                            onClick={() => setIsPaid(!isPaid)}
                        >
                            {isPaid ? 'Płatny' : 'Darmowy'}
                        </Button>
                    </Box>
                    {isPaid && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '10px',
                                gap: '5px',
                            }}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                value={cost}
                                onChange={e => setCost(Number(e.target.value))}
                            />
                            <Button variant="outlined" color="primary">
                                Użyj taryfikatora
                            </Button>
                        </Box>
                    )}
                    <Button
                        type="submit"
                        value="Submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Zapisz
                    </Button>
                    <Button
                        type="submit"
                        value="Submit"
                        variant="contained"
                        color="error"
                        onClick={onReturn}
                    >
                        Anuluj
                    </Button>
                    {data && (
                        <Button
                            type="submit"
                            value="Submit"
                            variant="contained"
                            color="error"
                        >
                            Usuń droge
                        </Button>
                    )}
                </>
            )}
            {page === 1 && roadPoints && PointList(setStartPoint)}
            {page === 2 && roadPoints && PointList(addPoint)}
            {page === 3 && roadPoints && PointList(setEndPoint)}
            {/* Problem z odswiezaniem - rozwiazanie chwilowe trzeba miec wczesjniej dodane punkty
            page === 4 && (
                <>
                    <FormPoint
                        callback={handleAddPoint}
                        onReturn={() => setPage(0)}
                    />
                </>
            )*/}
        </form>
    );
};
