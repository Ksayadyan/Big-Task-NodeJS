import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
const styles = {
    listContainer : {
        backgroundColor: "black",
        height : '100vh',
        width : '350px',
        textAlign : 'center'
    },
    button : {
        color : 'white'
    }
}
const SideList = (props) =>{
    return(
        <div className="list-container" style={styles.listContainer} >
            <Button style={styles.button}onClick={props.moveToMyAccount}>
                {props.content}
            </Button>
            <Divider />
        </div>
    )
}
export default withStyles(styles)(SideList);