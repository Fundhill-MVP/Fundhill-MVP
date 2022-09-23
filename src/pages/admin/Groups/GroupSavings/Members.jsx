import React, { useState, useEffect } from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../../../services';
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import { Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import useStyles from '../styles';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(1, '2022-05-2', 15000, 'Cash', 'For Loan'),
    // createData('Ice cream sandwich', 237, 9.0, 37,),

];


const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

const MembersModal = ({ history, groupId }) => {
    const classes = useStyles();
    // const [openn, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClosee = () => setOpen(false);
    // second modal
    const [lock, setUnlock] = useState(false);
    const handleUnlock = () => setUnlock(true);
    const handleLock = () => setUnlock(false);
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([])
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const queryPage = searchParams.get('page');
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);

    const allGroup = async () => {
        setIsLoading(true)
        const res = await api.service().fetch(`/accounts/group/?id=${groupId}?limit=${limit}&offset=${offset}`, true);
        console.log(res.data.results[0])
        if (api.isSuccessful(res)) {
            setData(res.data.results[0])
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
        allGroup();
    }, []);


    useEffect(() => {
        if (queryPage === null) {
            setSearchParams({ page: currentPage })
        }
    }, [])

    useEffect(() => {
        allGroup();
    }, [offset, limit])

    return (
        <div>
            <Button onClick={handleUnlock}>{history ? 'View Members' : 'pay Loan'}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={lock}
                onClose={handleLock}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={lock}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            View members
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <IconButton onClick={handleLock}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Divider style={{ marginTop: 40 }} />

                        {history ? (
                            isLoading ? (
                                <>

                                    <div className={classes.sweet_loading}>
                                        <BounceLoader color={color} loading={loading} css={override} size={150} />
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        <TableContainer component={Paper}>
                                            <Typography style={{ fontWeight: 600, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Group Members</Typography>
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell align="right">S/N</TableCell>
                                                        <TableCell align="right">Full Name</TableCell>
                                                        <TableCell align="right">Account Number</TableCell>
                                                        <TableCell align="right">Account Balance</TableCell>
                                                        <TableCell align="right">Phone Number</TableCell>
                                                        <TableCell align="right">Agent</TableCell>
                                                    </TableRow>

                                                </TableHead>
                                                <TableBody>
                                                    {data?.members?.map((group, index) => (
                                                        <TableRow key={group?.id}>
                                                            <TableCell align="right"> {++index} </TableCell>
                                                            <TableCell align="right"> {group.first_name} {group.last_name} </TableCell>
                                                            <TableCell align="right"> {group.bank_account_number}  </TableCell>
                                                            <TableCell align="right"> {group.wallet.balance} </TableCell>
                                                            <TableCell align="right"> {group.phone} </TableCell>
                                                            <TableCell align="right"> {group.agent.first_name} </TableCell>
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
                                        </TableContainer>
                                    </>

                                )
                        ) : ""}
                        <Divider style={{ marginTop: 40 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, width: '100%' }}>
                            <Button onClick={handleLock} variant="contained" style={{ textTransform: 'none' }}>{history ? 'Seen' : 'Close'}</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default MembersModal;