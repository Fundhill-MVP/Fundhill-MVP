import { Grid } from "@material-ui/core";
import useStyles from '../styles'
import Button from '@mui/material/Button';
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    // Chip
} from "@material-ui/core";
//   import useStyles from "./styles";
import { Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Widget from "../../../../components/Widget/Widget";
import ActionButton from "./ActionButton";
import { api } from '../../../../services';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import { on } from "../../../../events";
import { Context } from "../../../../context/Context";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";



const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;

function Transaction() {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [data, setData] = useState([]);
    const { user } = useContext(Context);
    const [marketers, setMarketers] = useState([]);
    const navigate = useNavigate();
    const [currentId, setCurrentId] = useState("");
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const queryPage = searchParams.get('page');
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);

    //  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
    //  keys.shift(); // delete "id" key


    const allGroup = async () => {
        setIsLoading(true)
        const res = await api.service().fetch(`/accounts/group/?limit=${limit}&offset=${offset}`, true);
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
        allGroup();
    }, [])
    on("reRenderAllGroup", allGroup);

    useEffect(() => {
        if (queryPage === null) {
            setSearchParams({ page: currentPage })
        }
    }, [])

    useEffect(() => {
        allGroup();
    }, [offset, limit])
    return (
        <Fragment>
            <PageTitle title="All Groups" />
            <Grid container spacing={4}>
                {
                    isLoading ?
                        (<div className={classes.sweet_loading}>
                            <BounceLoader color={color} css={override} size={150} />
                        </div>
                        ) :
                        (
                            <Grid item xs={12}>
                                <Widget title="Perform Transaction For Group" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                                    <Table className="mb-0">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >S/N</TableCell>
                                                <TableCell >Full Name</TableCell>
                                                <TableCell >Account Number</TableCell>
                                                <TableCell>Wallet Balance</TableCell>
                                                {/* <TableCell>Telephone</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Marketer</TableCell> */}
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* <TableRow> */}
                                            {data.map((group, index) => (
                                                <TableRow key={group.id} >
                                                    <TableCell className="pl-3 fw-normal"> {++index} </TableCell>
                                                    <TableCell> {group.name}	</TableCell>
                                                    <TableCell> {group.members[0].bank_account_number} </TableCell>
                                                    <TableCell> {group.members[0].wallet.balance} </TableCell>
                                                    {/* <TableCell> {group.phone} </TableCell>
                                                    <TableCell> {group.email}	</TableCell>
                                                    <TableCell>	{group.agent.first_name} </TableCell> */}
                                                    <TableCell>
                                                        <ActionButton groupId={group?.id} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {/* </TableRow> */}
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
                            </Grid>
                        )
                }


            </Grid>


        </Fragment>
    )
}

export default Transaction