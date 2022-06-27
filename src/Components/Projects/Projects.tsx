import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import DataTable from '../Table/Table';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";
import { Box, Grid, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { logout } from '../../Redux/Auth';
import { useDispatch } from 'react-redux';


interface Column {
    id: 'name' | 'score' | 'bugsCount' | 'durationInDays' | 'madeDadeline';
    label: string;
    align?: 'center';
}
  
const columns: readonly Column[] = [
{ 
    id: 'name', 
    label: 'Name', 
    align: 'center'
},
{ 
    id: 'score',
    label: 'Score',
    align: 'center',
},
{
    id: 'bugsCount',
    label: 'Bugs Count',
    align: 'center',
},
{
    id: 'durationInDays',
    label: 'Duration In Days',
    align: 'center',
},
{
    id: 'madeDadeline',
    label: 'Made Deadeline',
    align: 'center',
},
];


export default function Projects() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([])
    const { token  } = useSelector( (state : any) => state.auth);
    const [searchValue, setSearch] = useState('');
    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };
    
    // projects with search filter 
    let filteredResults = projects.filter((p:any)=> p.name.toString().toLowerCase().includes(searchValue.toString().toLowerCase()));
    
    // get projects data
    const loadProjects = async () => {
        try {
            let res = await axios.get("https://private-052d6-testapi4528.apiary-mock.com/info", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            setProjects(res.data)
            
        } catch (error: any) {
            if(error.status == 401){
                dispatch(logout())
                navigate("/");
            }
            else{
                alert("Faild to get projects data")
            }
 
        }
    }

    useEffect(() => {
        loadProjects()
    },[])

    return (
        projects.length > 0 ?
            <Paper sx={{ width: "100%" }} elevation={5}>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <TextField id="search" type="text" onChange={handleSearch} label="Search Name" variant="standard" />
                        </Grid>
                        <Grid item xs={4}>
                            {
                                filteredResults.length > 0 &&
                                <span style={{ fontSize: "14px" , fontWeight: "bold"}}> 
                                    <u>
                                         {/* calculation of Avrage Score to all search results  */}
                                        Avrage Score: 
                                        {((filteredResults.map((item: any) => item.score).reduce((prev, next) => prev + next)/filteredResults.length)).toFixed(2)}
                                        
                                    </u>
                                </span>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                filteredResults.length > 0 &&
                                <span style={{ fontSize: "14px" , fontWeight: "bold"}}> 
                                    <u>
                                        {/* calculation of all search results that made deadline  */}
                                        Made Deadline: 
                                        {((filteredResults.map((item: any) => item.madeDadeline).reduce((prev, next) => prev + next)/filteredResults.length)*100).toFixed(2)}
                                        %
                                    </u>
                                </span>
                            }
                        </Grid>
                    </Grid>

                </Box>
                <DataTable rows={filteredResults} columns={columns} />
            </Paper>
        :
            <CircularProgress color='info' />
    );
}