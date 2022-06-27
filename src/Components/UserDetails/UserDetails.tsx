import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import DataTable from '../Table/Table';


interface Column {
    id: 'name' | 'Team' | 'joinedAt' | 'avatar';
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
        id: 'Team',
        label: 'Team',
        align: 'center',
    },
    {
        id: 'joinedAt',
        label: 'Joined At',
        align: 'center',
    },
    {
        id: 'avatar',
        label: 'Avatar',
        align: 'center',
    },
];


export default function UserDetails() {
    const { personalDetails } = useSelector( (state : any) => state.auth);
    
    return ( 
        <Paper sx={{ width: "100%", mb: 3 }} elevation={5}>
            <DataTable rows={[personalDetails]} columns={columns} />
        </Paper>
    );
}