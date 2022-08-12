import { Formik, Form, Field } from "formik";
import { object as yupObject, string as yupString } from 'yup';
import { Fragment, useState, useContext } from "react";
import { api } from "../../../services";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";
import { Context } from "../../../context/Context";
import { Box, Button, FormControl, Select, Typography, MenuItem } from '@material-ui/core'
import PageTitle from '../../../components/PageTitle/PageTitle'
import useStyles from './styles';
import { TextField } from "../../../components/FormsUI"



function genPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

// console.log(genPassword())
// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const initialFormState = () => (
    {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        user_role: "",
        password: genPassword(),

    });

const validationSchema = yupObject().shape({
    first_name: yupString()
        .required("first name is required"),
    last_name: yupString()
        .required("last name is require"),
    email: yupString()
        .required("email is required"),
    phone: yupString()
        .required("phone is required"),
    user_role: yupString()
        .required("Marketer role is required")
})

function NewMarketer() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    let { user } = useContext(Context);
    // #90EE90
    const navigate = useNavigate();


    const marketer = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)
            const response = await api
                .service()
                .push(`/accounts/manage/signup/?org_id=${user.data.organisation}`, values, true)

            if (api.isSuccessful(response)) {
                setTimeout(() => {
                    toast.success('New marketer added successfully!');
                    navigate("/admin/dashboard/marketer/new_marketer", { replace: true })
                }, 0);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    return (
        <Fragment>
            <PageTitle title={`${user.data.organisation_name}`} />
            <Box className={classes.formBox}>
                <Typography variant='h5'>Add New Marketer</Typography>
                <Formik
                    initialValues={initialFormState()}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        await marketer(values)
                    }}
                >
                    <Form style={{ marginBottom: 30 }} >
                        <div className={classes.inputDiv}>
                            <div className={classes.label}>
                                <Typography >First Name</Typography>
                            </div>
                            <TextField
                                name="first_name"
                                className={classes.input}
                                variant="outlined"
                                size='small'
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <div className={classes.label}>
                                <Typography >Last Name</Typography>
                            </div>
                            <TextField
                                name="last_name"
                                className={classes.input}
                                variant="outlined"
                                size='small'
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <div className={classes.label}>
                                <Typography >Email</Typography>
                            </div>
                            <TextField
                                name="email"
                                className={classes.input}
                                variant="outlined"
                                size='small'
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <div className={classes.label}>
                                <Typography >Phone Number</Typography>
                            </div>
                            <TextField
                                name="phone"
                                className={classes.input}
                                variant="outlined"
                                size='small'
                                type='number'
                                required
                            />
                        </div>
                        <div className={classes.inputDiv}>
                            <div className={classes.label}>
                                <Typography >Marketer Role</Typography>
                            </div>
                            <TextField
                                select={true}
                                className={classes.input}
                                variant="outlined"
                                size='small'
                                name='user_role'
                                type='text'
                                required
                            >
                                <MenuItem>Select One</MenuItem>
                                <MenuItem value={"MANAGER"} >Manager</MenuItem>
                                <MenuItem value={"TELLER"}>Teller</MenuItem>
                                <MenuItem value={"AGENT"}>Agent</MenuItem>

                            </TextField>
                        </div>
                        {
                            isLoading ?
                                (<div className={classes.sweet_loading}>
                                    <DotLoader color={color} loading={loading} css={override} size={80} />
                                </div>)
                                : (
                                    <Button type="submit" className={classes.btnSubmit}>Submit</Button>
                                )
                        }
                    </Form>
                </Formik>

            </Box>
        </Fragment>
    )
}

export default NewMarketer