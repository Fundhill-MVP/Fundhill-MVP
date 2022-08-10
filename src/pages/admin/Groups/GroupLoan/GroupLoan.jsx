import { Container, Table, TableBody, TableCell, TableHead, TableRow,Button } from '@mui/material'
import React, { Fragment,useState,useEffect } from 'react'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import Widget from '../../../../components/Widget/Widget'
import useStyles from './styles';
import ActionButton from './ActionButton';
import AddLoan from './Modal';

import { api } from '../../../../services';
import { css } from "@emotion/react";
import {BounceLoader} from "react-spinners";
import {Context} from "../../../../context/Context";




// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const GroupLoan = () => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const [loans,setLoans] = useState([]);
    const [currentId,setCurrentId] = useState("");



    useEffect(() => {
        try {
            setIsLoading(true)

            const allGroupLoan = async() => {
              const res = await api.service().fetch("/dashboard/group-loan/",true);
              console.log(res.data)
              if(api.isSuccessful(res)){
                  console.log(res.data.results)
                setLoans(res.data.results)
              }
        
              setIsLoading(false);
        
            }
    
            allGroupLoan();
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
      },[]);


    return (
        <Fragment>
            <PageTitle title="Group Loan" />
            <Container>
                <Widget title="Group Loan Details" upperTitle noBodyPadding >
                    <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}>
                        <AddLoan />
                    </div>
                    {
                        isLoading ?
                        (
                            <div className="sweet-loading">
                                <BounceLoader color={color} loading={loading} css={override} size={150} />
                            </div>
                        ):
                        (
                            <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell >ID </TableCell>
                                <TableCell >Group Name</TableCell>
                                <TableCell >Amount</TableCell>
                                <TableCell>Amount to Repay</TableCell>
                                <TableCell>Loan officer</TableCell>
                                <TableCell>Loan Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Frequency</TableCell>
                                <TableCell>Payment Schedule</TableCell>
                                <TableCell>Date Disburse</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Loan Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {loans.map((loan) => (
                          <TableRow key={loan?.id}>
                            <TableCell className="pl-3 fw-normal">{loan?.id}</TableCell>
                            <TableCell>{loan?.group?.group_name}  </TableCell>
                            <TableCell>{loan?.amount}</TableCell>
                            <TableCell>{loan?.amount_to_repay}</TableCell>
                            <TableCell>{loan?.loan_officer}</TableCell>
                            <TableCell>{loan?.loan_product.name}</TableCell>
                            <TableCell>{loan?.category}</TableCell>
                            <TableCell>{loan?.payment_frequency}</TableCell>
                            <TableCell>{loan?.payment_schedule}</TableCell>
                            <TableCell>{loan?.date_created} </TableCell>
                            <TableCell>{loan?.final_due_date_time}</TableCell>
                            <TableCell>
                            <Button
                              variant='contained'
                              style={{ textTransform: 'none', fontSize: 12, background: 'red' }}>
                              {loan?.status}
                            </Button>
                          </TableCell>
                            <TableCell>
                              <ActionButton loanId={loan.id} />
                            </TableCell>
                          </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                        )
                    }
                </Widget>
            </Container>
        </Fragment>
    )
}

export default GroupLoan