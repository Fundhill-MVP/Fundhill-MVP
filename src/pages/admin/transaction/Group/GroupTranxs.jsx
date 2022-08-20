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
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Widget from "../../../../components/Widget/Widget";
import ActionButton from "./ActionButton";
import { api } from '../../../../services';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import {on} from "../../../../events";
import { Context } from "../../../../context/Context";



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
    const [currentId,setCurrentId] = useState("");
  
    //  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
    //  keys.shift(); // delete "id" key
  
  
  
  
    const allGroup = async () => {
      setIsLoading(true)
      const res = await api.service().fetch("/accounts/group/", true);
      console.log(res.data)
      if (api.isSuccessful(res)) {
        setData(res.data.results)
      }
  
      setIsLoading(false);
  
    }
    useEffect(() => {
      allGroup();
    }, [])
    on("reRenderAllGroup",allGroup);

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
                                                <TableCell >ID</TableCell>
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
                                            {data.map((group) => (
                                                <TableRow key={group.id} >
                                                    <TableCell className="pl-3 fw-normal"> {group.id} </TableCell>
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
                                </Widget>
                            </Grid>
                        )
                }


            </Grid>


        </Fragment>
    )
}

export default Transaction