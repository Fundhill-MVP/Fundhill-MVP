import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { Fragment, useState, useEffect, useContext } from "react";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import PageTitle from '../../../components/PageTitle/PageTitle'
import Widget from '../../../components/Widget/Widget'
import useStyles from '../styles';
import ActionButton from './Modal';
import { api } from '../../../services';
import { Context } from "../../../context/Context";
import {on} from "../../../events";



const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;


const Organisation = () => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    let [color, setColor] = useState("#ADD8E6");
    const { user } = useContext(Context);

    const allActiveOrgs = async () => {
        setIsLoading(true)

        const res = await api.service().fetch("/accounts/organisation/", true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
            setData(res.data.results)
        }
        setIsLoading(false);
    }


    useEffect(() => {
        allActiveOrgs();

    }, [])
    on("reRenderActiveOrg",allActiveOrgs);

    return (
        <Fragment>
            <PageTitle title="Organisations" />
            <Container>
                <Widget title="All Collections of Branches" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell > ID </TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell>Organisation Type</TableCell>
                                <TableCell >Transactions</TableCell>
                                <TableCell>Joined Date</TableCell>
                                <TableCell>Total Branches Branches</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((org) => (
                                <TableRow key={org.id} >
                                    <TableCell className="pl-3 fw-normal"> {org.id} </TableCell>
                                    <TableCell> {org.name}</TableCell>
                                    <TableCell> {org.type} </TableCell>
                                    <TableCell> {org.transactions} </TableCell>
                                    <TableCell> {org.created} </TableCell>    
                                    <TableCell> {org.branches} </TableCell>    
                                    <TableCell>
                                        <ActionButton orgId={org?.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Widget>
            </Container>
        </Fragment>
    )
}

export default Organisation