import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TargetedSavingsModal from '../modals/TargetedSavingsModal';
import ThriftSavingsModal from "../modals/ThriftSavings";
import SavingsTypeModal from '../modals/SavingsType';
import { api } from '../../../../services';

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

const AddPlanActionButton = ({ handleUnlocks,customerId }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const savingsType = async () => {
        setIsLoading(true)
        const products = await api
          .service()
          .fetch("/dashboard/savings-plan-type/", true);
        console.log(products.data.results)
        console.log(products.data.results[0].is_periodic)
    
        if ((api.isSuccessful(products))) {
          setData(products?.data?.results);
          setIsLoading(false)
    
        } else {
          setIsLoading(true)
        }
      }
    
    
        React.useEffect(() => {
           savingsType();
        },[])

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Add Plan
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
                {/* <MenuItem onClick={handleUnlocks} disableRipple>
                    Fixed Savings
                </MenuItem>
                <MenuItem disableRipple>
                    <TargetedSavingsModal customerId={customerId} />
                </MenuItem>
                <MenuItem disableRipple>
                    <ThriftSavingsModal customerId={customerId} />
                </MenuItem> */}

                {
                    data.map((product) => (
                        <MenuItem disableRipple key={product.id}>
                            <SavingsTypeModal productId={product.id} savingsName={product.name} customerId={customerId} />
                        </MenuItem>
                    ))
                }
            </StyledMenu>
        </div>
    )
}

export default AddPlanActionButton