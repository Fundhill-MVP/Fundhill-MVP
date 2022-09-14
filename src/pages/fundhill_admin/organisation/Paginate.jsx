import { TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services';

const Paginate = ({ page }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const allActiveOrgs = async () => {
        const res = await api.service().fetch("/accounts/organisation/", true);
        // console.log(res.data)
        console.log(res.data.next);
        if (api.isSuccessful(res)) {
            setData(res.data.results)
        }
    }


    useEffect(() => {
        if (page) {
            allActiveOrgs(page);
        }
    }, [page]);

    const handleChangePage = () => {
        navigate(`/admin/fundhill/organisation?page=${page}`)
    }


    const handleChangeRowsPerPage = () => {

    }
    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count="5"
            rowsPerPage={page}
            page={page || 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}

export default Paginate