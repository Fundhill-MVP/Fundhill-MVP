import React, { useState } from 'react';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';
import useStyles from '../styles';

const CheckBox = () => {
    const classes = useStyles();
    const [itemDatas, setItemDatas] = useState([]);

    const [selectedWalls, setSelectedWalls] = useState([]);
    const addToList = (id) => {
        const selectedWall = itemDatas.find((item) => item.id === id);
        const selected = selectedWalls.find((Inwall) => Inwall.id === id);

        if (selected) {
            setSelectedWalls(selectedWalls.filter((wall) => wall.id !== id));
        } else {
            setSelectedWalls([...selectedWalls, selectedWall]);
        }
    };

    return (
        <div>
            {itemDatas.map((data) => {
                const selected = selectedWalls.find(
                    (chosen) => data.id === chosen.id
                );
                <div className={classes.check}>
                    <span className={classes.check}>
                        {selected ? <CheckCircle fontSize='large' /> : <CheckCircleOutline fontSize='large' />}
                    </span>
                </div>
            })}
        </div>
    )
}

export default CheckBox