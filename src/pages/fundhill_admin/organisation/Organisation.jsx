import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import PageTitle from '../../../components/PageTitle/PageTitle'
import Widget from '../../../components/Widget/Widget'
import useStyles from '../styles';
const Organisation = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <PageTitle title="Organisations" />
            <Container>
                <Widget title="All Collections of Branches" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell >Branch ID </TableCell>
                                <TableCell >Branch Name</TableCell>
                                <TableCell >Branch Location</TableCell>
                                <TableCell>Head of Branch</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="pl-3 fw-normal">1</TableCell>
                                <TableCell>	Leasson Teacher</TableCell>
                                <TableCell>bukuru locus</TableCell>
                                <TableCell>John onaks</TableCell>
                                <TableCell>
                                    {/* <BtnAction /> */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Widget>
            </Container>
        </Fragment>
    )
}

export default Organisation