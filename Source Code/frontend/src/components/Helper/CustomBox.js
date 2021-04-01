import {Button,Box} from '@material-ui/core'

const CustomBox = (props) => {
    return(
        <Box boxShadow={3} bgcolor="background.paper" onClick={props.onClick} m={2} p={3} style={{textAlign: "center"}}>
             <Button>{props.innerText}</Button>
        </Box>
    );
}

export default CustomBox;