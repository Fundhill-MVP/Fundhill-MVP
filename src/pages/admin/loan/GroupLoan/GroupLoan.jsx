import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import Widget from '../../../../components/Widget/Widget'
import useStyles from '../styles';
import ActionButton from './ActionButton';
import AddLoan from './Modal';
const GroupLoan = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <PageTitle title="Group Loan" />
            <Container>
                <Widget title="Group Loan Details" upperTitle noBodyPadding >
                    <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}>
                        <AddLoan />
                    </div>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell >ID </TableCell>
                                <TableCell >Product</TableCell>
                                <TableCell >Amount</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Frequency</TableCell>
                                <TableCell>Loan officer</TableCell>
                                <TableCell>Group</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="pl-3 fw-normal">23</TableCell>
                                <TableCell>	Daniel Yusuf</TableCell>
                                <TableCell>Yakuku John</TableCell>
                                <TableCell>Account Number</TableCell>
                                <TableCell>08080080808</TableCell>
                                <TableCell>123456</TableCell>
                                <TableCell>5000000</TableCell>
                                <TableCell><ActionButton /></TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </Widget>
            </Container>
        </Fragment>
    )
}

export default GroupLoan