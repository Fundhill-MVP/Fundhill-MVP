import { Grid } from "@material-ui/core";
import useStyles from './styles'
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
import { Fragment, useEffect, useState,useContext } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import ActionButton from "./ActionButtons/SavingsActionButton";
import { api } from '../../../services';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import {Context} from "../../../context/Context"


const override = css`
display: block;
margin: 0 auto;
border-color: green;
align-items: center;
`;
const SavingsPlan = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [delBtn, setDelBtn] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false)
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [marketers, setMarketers] = useState([]);
    const {user} = useContext(Context)
    useEffect(() => {
        setIsLoading(true)

        const allCustomer = async () => {
            const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED", true);
            console.log(res.data)
            if (api.isSuccessful(res)) {
                setData(res.data.results)
            }
            setIsLoading(false);

        }

        allCustomer();
    }, [])

    return (
        <Fragment>
            <PageTitle title={`${user.data.organisation_name}`} />
            <Grid container spacing={4}>
                {
                    isLoading ?
                        (<div className={classes.sweet_loading}>
                            <BounceLoader color={color} l css={override} size={150} />
                        </div>
                        ) :
                        (
                            <Grid item xs={12}>
                                <Widget title="Add A Customer Plan" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                                    <Table className="mb-0">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >ID</TableCell>
                                                <TableCell >Full Name</TableCell>
                                                <TableCell >Account Number</TableCell>
                                                <TableCell>Wallet Balance</TableCell>
                                                <TableCell>Telephone</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Marketer</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* <TableRow> */}
                                            {data.map((customer) => (
                                                <TableRow key={customer.id} >
                                                    <TableCell className="pl-3 fw-normal"> {customer.id} </TableCell>
                                                    <TableCell> {customer.first_name} {customer.last_name}	</TableCell>
                                                    <TableCell> {customer.bank_account_number} </TableCell>
                                                    <TableCell> {customer.wallet.balance} </TableCell>
                                                    <TableCell> {customer.phone} </TableCell>
                                                    <TableCell> {customer.email}	</TableCell>
                                                    <TableCell>	{customer.agent.first_name} </TableCell>
                                                    <TableCell>	<Button style={{ textTransform: 'none' }} variant="contained" disableElevation> {customer.status} </Button></TableCell>
                                                    <TableCell>
                                                        <ActionButton customerId={customer?.id} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {/* </TableRow> */}
                                        </TableBody>
                                    </Table>
                                </Widget>
                            </Grid>
                        )
                }
            </Grid>


        </Fragment>
    )
}

export default SavingsPlan