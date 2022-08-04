import { Button, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllModal from './Modal';
import { api } from '../../../services';
import {toast} from "react-toastify"
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export default function ActionButton({setFeeId}) {
    const [anchorEl, setAnchorEl] = useState(null);
    // let [color, setColor] = useState("#ADD8E6");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ADD8E6");
  const [data, setData] = useState([]);
  const [marketers, setMarketers] = useState([]);
  const navigate = useNavigate();

  
    //  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
    //  keys.shift(); // delete "id" key
  
  
    useEffect(() => {
      setIsLoading(true)
  
      const allBranch = async () => {
        const res = await api.service().fetch("/dashboard/branches/", true);
        // console.log(res.data)
        if (api.isSuccessful(res)) {
          setData(res.data.results)
        }
  
        setIsLoading(false);
  
      }
  
      allBranch();
    }, []);

    // const marketer = marketers.map((item) => {return item})


    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                style={{ textTransform: 'none' }}
            >
                Action
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={handleOpen} history disableRipple>
                    Action
                </MenuItem> */}
                <MenuItem disableRipple>
                    <AllModal setFeeId={setFeeId} />
                </MenuItem>
                <MenuItem disableRipple>
                    <AllModal setFeeId={setFeeId} updates />
                </MenuItem>
            </StyledMenu>
        </div>
    )

}
