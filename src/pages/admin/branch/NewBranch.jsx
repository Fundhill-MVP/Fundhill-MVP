import { Box, Button, FormControl, TextField, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import PageTitle from '../../../components/PageTitle/PageTitle'
import useStyles from './styles'
const NewBranch = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <PageTitle title="Add New Branch" />
            <Box className={classes.formBox}>
                <Typography variant='h5'>New Branch</Typography>
                <form style={{ marginBottom: 30 }} >
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Branch Name</Typography>
                        </div>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            size='small'
                            name=''
                            type='text'
                            required
                        />
                    </div>
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Branch Head</Typography>
                        </div>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            size='small'
                            name=''
                            type='text'
                            required
                        />
                    </div>
                    <div className={classes.inputDiv}>
                        <div className={classes.label}>
                            <Typography >Branch Address</Typography>
                        </div>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            size='small'
                            name=''
                            type='text'
                            required
                        />
                    </div>
                    <Button className={classes.btnSubmit}>Submit</Button>
                </form>
            </Box>
        </Fragment>
    )
}

export default NewBranch