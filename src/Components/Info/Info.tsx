import { Box } from '@mui/material';
import Projects from '../Projects/Projects';
import UserDetails from '../UserDetails/UserDetails';

export default function Info() {

    return (
        <Box sx={{ width:"75vw" , py: 2}}>
            <Box sx={{pb:2}}>
                <UserDetails />
            </Box>
            <Projects />
        </Box>
    );
}