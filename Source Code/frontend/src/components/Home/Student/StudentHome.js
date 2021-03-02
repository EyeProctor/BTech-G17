import { AppBar, Toolbar, Card, Grid } from "@material-ui/core";

const StudentHome = () => {

    return(
        <>
            <AppBar>
                <Toolbar stype={{backgroundColor: "black" }}>
                </Toolbar>
            </AppBar>
            <Grid style={{marginTop: 100}} container spacing={2}>
                <Grid item xs={4}>
                    <Card >
                        Students Course Details
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default StudentHome;