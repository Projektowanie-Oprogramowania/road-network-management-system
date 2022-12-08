import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import useFetch from '../../use-fetch';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    stableSort,
    getComparator,
    EnhancedTableHead,
    EnhancedTableToolbar,
} from '@components/Table';
import { Button, Stack, Typography } from '@mui/material';
import {
    Fee,
    getPaymentsByUserID,
    removeFee,
} from 'Screens/FeesWindow/Logic/FeesLogic';
import useAlert from '@context/useAlert';

interface IRow {
    id: number;
    amount: number;
    chargeType: string;
    date: Date;
    description: string;
    paid: boolean;
    userID: number;
    buttons: JSX.Element;
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'Id',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Ilość',
    },
    {
        id: 'chargeType',
        numeric: true,
        disablePadding: false,
        label: 'Typ',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Data',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Opis',
    },
    {
        id: 'paid',
        numeric: false,
        disablePadding: false,
        label: 'Zapłacono',
    },
    {
        id: 'userId',
        numeric: true,
        disablePadding: false,
        label: 'Id użytkownika',
    },
    {
        disablePadding: false,
    },
];

export default function FeesWindow() {
    const [rows, setRows] = React.useState<IRow[]>([]);
    const { setAlert } = useAlert();

    function createData(
        id: number,
        amount: number,
        chargeType: string,
        date: Date,
        description: string,
        paid: boolean,
        userID: number,
        buttons: JSX.Element,
    ) {
        return {
            id,
            amount,
            chargeType,
            date,
            description,
            paid,
            userID,
            buttons,
        };
    }

    const moveToDetails = (id: string): (() => void) => {
        return () => {
            navigate(`./${id}`);
        };
    };

    const deleteFee = (id: string): (() => Promise<void>) => {
        return async () => {
            const res = await removeFee(id);
            if (res) {
                setAlert(`Usunięto ${id}`);
                updateData();
                return;
            }
            setAlert(`Błąd podczas usuwania!`);
        };
    };

    function initializeData(tariffs: Fee[]) {
        const rows: IRow[] = [];
        console.log(tariffs);
        tariffs.forEach((element: Fee) => {
            rows.push(
                createData(
                    element.id,
                    element.amount,
                    element.chargeType,
                    element.date,
                    element.description,
                    element.paid,
                    element.userID,
                    <>
                        <Button
                            variant="contained"
                            onClick={moveToDetails(String(element.id))}
                        >
                            Szczegóły
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={deleteFee(String(element.id))}
                        >
                            Usuń
                        </Button>
                    </>,
                ),
            );
        });
        setRows(rows);
    }

    useEffect(() => {
        updateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateData: () => void = async () => {
        const _t = await getPaymentsByUserID('0');
        initializeData(_t);
        setSelected([]);
    };

    const deleteHandler = () => {
        selected.forEach(element => {
            // DELETE
        });
        window.location.reload();
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        color: 'white',
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'black',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#202020',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#161616',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleRequestSort = (
        event: any,
        property: React.SetStateAction<string>,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: { target: { checked: any } }) => {
        if (event.target.checked) {
            const newSelected = rows.map(n => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (
        event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        name: any,
    ) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: any[] | ((prevState: never[]) => never[]) = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected?.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (
        event: any,
        newPage: React.SetStateAction<number>,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /*
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  */

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const navigate = useNavigate();

    const handleAddTariffs = () => {
        navigate('add', { replace: false });
    };

    return (
        <>
            <Box sx={{ width: '96%', marginLeft: '2%' }}>
                <Paper
                    sx={{
                        width: '100%',
                        mb: 2,
                        color: 'white',
                        background: '#111111',
                    }}
                >
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        title={'Opłaty'}
                        showDisable={false}
                        onDelete={deleteHandler}
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                headCells={headCells}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows?.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage,
                                    )
                                    .map(
                                        (
                                            row: {
                                                amount: React.ReactNode;
                                                chargeType: React.ReactNode;
                                                date: React.ReactNode;
                                                description: React.ReactNode;
                                                paid: React.ReactNode;
                                                userId: React.ReactNode;
                                                id:
                                                    | boolean
                                                    | React.ReactElement<
                                                          any,
                                                          | string
                                                          | React.JSXElementConstructor<any>
                                                      >
                                                    | React.ReactFragment
                                                    | React.Key
                                                    | null
                                                    | undefined;
                                                buttons: JSX.Element;
                                            },
                                            index: any,
                                        ) => {
                                            const isItemSelected = isSelected(
                                                row?.id,
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <StyledTableRow
                                                    hover
                                                    onClick={event =>
                                                        handleClick(
                                                            event,
                                                            row?.id,
                                                        )
                                                    }
                                                    role="checkbox"
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    selected={isItemSelected}
                                                >
                                                    <StyledTableCell padding="checkbox">
                                                        <Checkbox
                                                            sx={{
                                                                color: 'white',
                                                            }}
                                                            color="primary"
                                                            checked={
                                                                isItemSelected
                                                            }
                                                            inputProps={{
                                                                'aria-labelledby':
                                                                    labelId,
                                                            }}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                        align="right"
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {' '}
                                                        {row?.id}{' '}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.amount}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.chargeType}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.date}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {row?.description}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {row?.paid
                                                            ? 'tak'
                                                            : 'nie'}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        0
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.buttons}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        },
                                    )}
                                {emptyRows > 0 && (
                                    <StyledTableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <StyledTableCell colSpan={6} />
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        sx={{ color: 'white', marginBottom: -2 }}
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <Stack direction="column">
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    onClick={handleAddTariffs}
                    sx={{
                        width: 320,
                        height: 80,
                        fontSize: 24,
                        alignSelf: 'center',
                        borderRadius: '20px',
                        background: '#388E3C',
                        position: 'relative',
                        bottom: -64,
                        center: '0',
                    }}
                >
                    <Typography
                        sx={{ fontWeight: 'bold' }}
                        style={{ textTransform: 'none', fontSize: '24px' }}
                    >
                        Dodaj opłatę
                    </Typography>
                </Button>
            </Stack>
        </>
    );
}
