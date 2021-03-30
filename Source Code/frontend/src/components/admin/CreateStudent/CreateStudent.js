import {TextField, FormControl, FormControlLabel, Select, MenuItem, InputLabel, Grid} from '@material-ui/core'

const CreateStudent = () => {
    return(
        <div>
            <form>
                <Grid container justify="space-between">
                    <Grid item xs={4} >
                        <TextField fullWidth required label="First Name" variant="outlined"/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth required label="Middle Name" variant="outlined"/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth required label="Last Name" variant="outlined"/>
                    </Grid>
                </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth required label="Email" variant="outlined"/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField type="number" fullWidth required label="Phone Number" variant="outlined"/>
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl fullWidth>
                            <InputLabel id="branchDD">Branch</InputLabel>
                            <Select labelId="branchDD" >
                                <MenuItem value={"biotech"}>BioTech</MenuItem>
                                <MenuItem value={"civil"}>Civil</MenuItem>
                                <MenuItem value={"cse"}>CSE</MenuItem>
                                <MenuItem value={"electronics"}>Electronics</MenuItem>
                                <MenuItem value={"mech"}>Mechanical</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={5} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="classDD">Select Class</InputLabel>
                            <Select labelId="classDD" >
                                <MenuItem value={"FY"}>First Year</MenuItem>
                                <MenuItem value={"SY"}>Second Year</MenuItem>
                                <MenuItem value={"TY"}>Third Year</MenuItem>
                                <MenuItem value={"Btech"}>Final Year</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>


            </form>
        </div>
    );
}

export default CreateStudent;