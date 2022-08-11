import { Fragment, useContext, useState, useEffect } from "react";
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
import SearchGroup from "./SearchGroup";
import { TextField } from "../../../../components/FormsUI";
// import { collapseClasses } from "@mui/material";


// CONTEXT
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function NewGroup() {
    const classes = useStyles();

    const { user } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ADD8E6");
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);




    const initialFormState = () => ({
        name: "",
        members: "",
        description: "",
    });

    const validationSchema = yupObject().shape({
        name: yupString()
            .required("Group name is required"),
        description: yupString()
            .required("Enter the group description")
    })


    useEffect(() => {
        try {
            setIsLoading(true)

            const allCustomer = async () => {
                const res = await api.service().fetch("/accounts/manage/?user_role=customers&status=VERIFIED", true);
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
    }, []);


    const add_group = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)

            const response = await api
                .service()
                .push("/accounts/group/add/", values, true)

            if (api.isSuccessful(response)) {
                setTimeout(() => {
                    toast.success("Group successfully added!");
                    navigate("/admin/dashboard/group/new_group", { replace: true })
                }, 0);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Fragment>
            <PageTitle title="FUNDHILL" />
            <Box className={classes.formBox}>
                <Typography variant='h5'>Add New Group</Typography>
                <Formik
                    initialValues={initialFormState()}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        await add_group(values)
                    }}
                >

                    {({ values }) => (
                        <Form style={{ marginBottom: 30 }} >

                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Name</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="name" size='small' />
                            </div>
                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Members</Typography></div>
                                <SearchGroup />
                            </div>
                            <div className={classes.formDiv}>
                                <div className={classes.divTypo}><Typography>Description</Typography></div>
                                <TextField fullWidth variant='outlined' type="text" name="description" size='small' />
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
                    )}

                </Formik>

            </Box>
        </Fragment>
    )
}

export default NewGroup