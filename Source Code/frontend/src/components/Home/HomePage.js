import { AppBar, Toolbar, Card, Grid } from "@material-ui/core";

const HomePage = () => {
    return(
        
            <>
                <AppBar>
                    <Toolbar stype={{backgroundColor: "black" }}>
                    </Toolbar>
                </AppBar>
                <Grid style={{marginTop: 100}} container spacing={2}>
                <Grid item xs={4}>
                    <Card >
                        Card 1: May be Quiz Details
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card >
                        Card 2: May be OE Details
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card >
                        Card 3: May be POE Details
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}


export default HomePage;