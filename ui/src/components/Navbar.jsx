import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

function Navbar() {

        const navigate = useNavigate();

        return (
            <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2}}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            BLOGHERE
                        </Typography>
                        <Button color="inherit" onClick={()=>navigate("/")} sx={{ fontSize: '1.2rem' }}>Home</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
        )
}

export default Navbar;