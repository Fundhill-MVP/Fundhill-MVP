import { Button, Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import React, { Fragment, useState, useEffect, useContext } from "react";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import PageTitle from '../../../components/PageTitle/PageTitle'
import Widget from '../../../components/Widget/Widget'
import useStyles from './styles';
import ActionButton from './Modal';
import { api } from '../../../services';
import { Context } from "../../../context/Context";
import { on } from "../../../events";
import { useSearchParams } from 'react-router-dom';

const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const Organisation = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    let [color, setColor] = useState("#ADD8E6");
    const { user } = useContext(Context);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const queryPage = searchParams.get('page');
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);

    const allActiveOrgs = async () => {
        setIsLoading(true)

        const res = await api.service().fetch(`/accounts/organisation/?limit=${limit}&offset=${offset}`, true);
        console.log(res.data)
        if (api.isSuccessful(res)) {
            setData(res.data.results)
            setCount(res.data.count)
        }
        setIsLoading(false);
    }

    const nextPage = () => {
        setSearchParams({ page: currentPage + 1 })
        setCurrentPage(currentPage + 1);
        setOffset(offset + limit)
        console.clear()
        console.log(offset)
    }

    const previousPage = () => {
        setSearchParams({ page: currentPage - 1 })
        setCurrentPage(currentPage - 1);
        setOffset(offset - limit)
        console.clear()
        console.log(offset)
    }

    const handleRowPerPage = (event) => {
        setLimit(event.target.value)
    }

    const isNextBtnDisabled = () => count > offset && (offset + limit) < count
    const isPrevBtnDisabled = () => offset > 0

    useEffect(() => {
        allActiveOrgs();

    }, [])

    on("reRenderActiveOrg", allActiveOrgs);

    useEffect(() => {
        if (queryPage === null) {
            setSearchParams({ page: currentPage })
        }
    }, [])

    useEffect(() => {
        allActiveOrgs();
    }, [offset, limit])

    return (
        <Fragment>
            <PageTitle title="Organisations" />
            {
                isLoading ?
                    (
                        <div className={classes.sweet_loading}>
                            <BounceLoader color={color} loading={loading} css={override} size={150} />
                        </div>
                    ) :
                    (
                        <Container>
                            <Widget title="All Collections of Branches" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                                <Table className="mb-0">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell > S/N </TableCell>
                                            <TableCell >Name</TableCell>
                                            <TableCell>Organisation Type</TableCell>
                                            <TableCell >Transactions</TableCell>
                                            <TableCell>Joined Date</TableCell>
                                            <TableCell>Total Branches Branches</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((org, index) => (
                                            <TableRow key={org.id} >
                                                <TableCell className="pl-3 fw-normal"> {++index} </TableCell>
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
                                <div className={classes.paginationContain}>
                                    <div className={classes.paginateRow}>
                                        <FormControl sx={{ m: 1 }} size="small">
                                            <InputLabel id="demo-select-small">Row Per Page</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={limit}
                                                label="Row Per Page"
                                                onChange={handleRowPerPage}
                                            >
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={classes.paginate}>
                                        <Button
                                            size='small'
                                            disabled={!isPrevBtnDisabled()}
                                            onClick={previousPage}>
                                            previous
                                        </Button>
                                        <Button
                                            size='small'
                                            disabled={!isNextBtnDisabled()}
                                            onClick={nextPage}>
                                            next
                                        </Button>
                                    </div>
                                </div>
                            </Widget>
                        </Container>
                    )
            }

        </Fragment>
    )
}

export default Organisation