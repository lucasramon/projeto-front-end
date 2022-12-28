import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { moviesMockData } from './mockMovies';


const columns = [
    { id: 'Title', label: 'Título', minWidth: 170 },
    { id: 'Year', label: 'Ano', minWidth: 100 },
    {
        id: 'actions',
        label: 'Ações',
        minWidth: 170,
        align: 'center',
    },

];

const rows = moviesMockData;

export default function Dashboard() {

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
            <TableContainer sx={{ maxHeight: 615 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows

                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={index} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
