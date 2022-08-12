import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import { object as yupObject, string as yupString, number as yupNumber } from "yup";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";
import { Box, Button, Typography, MenuItem, } from '@material-ui/core'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import useStyles from '../styles';
import { api } from "../../../../services"
import { Context } from "../../../../context/Context";
// import { TextField } from "@mui/material";


export default function SearchGroup({setSelectedOption}) {

    const { user } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [members, setMembers] = useState("");

    useEffect(() => {
        try {
            setIsLoading(true)

            const allCustomer = async () => {
                const res = await api.service().fetch("/accounts/manage/?user_role=CUSTOMER&status=VERIFIED", true);
                console.log(res.data)
                if (api.isSuccessful(res)) {
                    setCustomers(res.data.results)
                }

            }
            setIsLoading(false);

            allCustomer();
        } catch (error) {
            console.log(error);
            setIsLoading(false);

        }
      },[])
      
      const setValue = (newValue) => {
        console.log(newValue); 
    }
    return (
        <Autocomplete
            multiple
            size="small"
            limitTags={2}
            id="multiple-limit-tags"
            options={customers}
            getOptionLabel={(customer) => customer.first_name}
            getOptionSelected={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
                const serializedValues = newValue?.map((value) => value?.id);
                setValue(serializedValues);
                setSelectedOption(serializedValues)
            }}





            // defaultValue={customers.map((customer) => [customer.id])}
            renderInput={(params) => (
                <TextField {...params} size='small' label="Members" name='members' placeholder="Members" />
            )}
            sx={{ width: '100%' }}
        />
    );

    // return (
    //     <Autocomplete
    //         multiple
    //         size="small"
    //         limitTags={2}
    //         id="multiple-limit-tags"
    //         options={top100Films}
    //         getOptionLabel={(option) => option.title}
    //         defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
    //         renderInput={(params) => (
    //             <TextField {...params} size='small' label="Members" placeholder="Members" />
    //         )}
    //         sx={{ width: '100%' }}
    //     />
    // );
}



