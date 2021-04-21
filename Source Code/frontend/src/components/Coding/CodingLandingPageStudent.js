import { Container, Grid, Typography } from "@material-ui/core";

const CodingLandingPageStudent = (props) => {
    const codeID = props.match.params.codingID;
    return(
        <Container>
            <Grid container>
                <Grid item>
                    <Typography>
                        {codeID}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}


export default CodingLandingPageStudent;