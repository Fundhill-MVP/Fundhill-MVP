import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import PageTitle from '../../../components/PageTitle/PageTitle'
import Widget from '../../../components/Widget/Widget'
import useStyles from '../styles';
import ActionButton from './ActionButton';
const Users = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <PageTitle title="Users" />
            <Container>
                <Widget title="All Collections of Branches" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell> ID </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="pl-3 fw-normal">1</TableCell>
                                <TableCell>LegendarySayae</TableCell>
                                <TableCell>
                                    <ActionButton />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Widget>
            </Container>
        </Fragment>
    )
}

export default Users