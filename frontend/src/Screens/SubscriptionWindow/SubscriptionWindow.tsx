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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    stableSort,
    getComparator,
    EnhancedTableHead,
    EnhancedTableToolbar,
} from '@components/Table';
import { Button, Stack, Typography } from '@mui/material';
import { getSubscriptionsByUserID, Subscription } from './SubscriptionLogic';

function createData(id: any, chargeId: any, description: any, startDate: any, endDate: any) {
    return {
        id,
        chargeId,
        description,
        startDate,
        endDate
    };
}

let rows: { id: any; chargeId: any; description: any; startDate: any, endDate: any }[] = [];

function initializeData(tariffs: Subscription[]) {
    rows = [];
    console.log(tariffs)
    tariffs.forEach((element: Subscription) => {
        rows.push(createData(element.id, element.chargeId, element.description, element.startDate, element.endDate));
    });
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'Id',
    },
    {
        id: 'chargeId',
        numeric: true,
        disablePadding: false,
        label: 'Id Opłaty',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Opis',
    },
    {
        id: 'startDate',
        numeric: true,
        disablePadding: false,
        label: 'Data rozpoczęcia',
    },
    {
        id: 'endDate',
        numeric: true,
        disablePadding: false,
        label: 'Data zakończenia',
    },
];

export default function TariffWindow() {

    useEffect(() => {
        updateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateData: () => void = async () => {
        const _t = await getSubscriptionsByUserID("0");
        initializeData(_t);
        setSelected([])
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
                        title={'Subskrypcje'}
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
                                            row: Subscription,
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
                                                    <StyledTableCell align="left">
                                                        {row?.chargeId}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.description}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.startDate.toString()}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        {row?.endDate.toString()}
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
                        Dodaj subskrypcję
                    </Typography>
                </Button>
            </Stack>
        </>
    );
}
