import { Fragment, useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, FormControl,TextField,Select, Typography,MenuItem } from '@material-ui/core';
import {ClipLoader,BounceLoader} from "react-spinners";
import { Formik, Form, Field } from "formik";
import {object as yupObject,string as yupString,number as yupNumber} from "yup";
import { ErrorMsg } from "../../../layouts/components";
import { toast } from "react-toastify";

import { api } from '../../../services';
import { css } from "@emotion/react";
import {Context} from "../../../context/Context";
import PageTitle from "../../../components/PageTitle"
import Widget from "../../../components/Widget/Widget";

function AllMarketer() {
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const {user} = useContext(Context);
    const [marketers,setMarketers] = useState([]);



    useEffect(() => {
        setIsLoading(true)

        const allMarketer = async() => {
          const res = await api.service().fetch("/accounts/manage/?is_staff=True",true);
          console.log(res.data)
          if(api.isSuccessful(res)){
            //   console.log(res)
            setMarketers(res.data.results)
          }
    
          setIsLoading(false);
    
        }

        allMarketer();
      },[])


      const edit_marketer = async(values,id) => {
        setLoading(true);
        console.log(values)

        const response = await api
            .service()
            .update(`/accounts/auth/${id}/`,values,true)

        if(api.isSuccessful(response)){
        setTimeout( () => {
            toast.success("Marketer profile successfully updated!!");
            // navigate("/admin/allbranch",{replace: true})
        },0);
        }
        setLoading(false);
    }
    const fund_marketer = async(values,id) => {
            try {
                setLoading(true);
                console.log(values)

                const response = await api
                    .service()
                    .push(`/wallets/marketers/${id}/fund-wallet/`,values,true)
                if(api.isSuccessful(response)){
                setTimeout( () => {
                    toast.success("Transaction successful");
                    // navigate("/admin/allbranch",{replace: true})
                },0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
                }



      const deleteMarketer = async(id) => {
        const res = await api.service().remove(`/accounts/auth/${id}/`,true);
        console.log(res.data)
        if(api.isSuccessful(res)){
            setTimeout( () => {
                toast.success("Successfully deleted marketer!");
            },0);
            }
  
      }
  return (
    <div>AllMarketer</div>
  )
}

export default AllMarketer