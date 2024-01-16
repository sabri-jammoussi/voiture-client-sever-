"use client";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AllOutIcon from '@mui/icons-material/AllOut';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article'; 
import FaceIcon from '@mui/icons-material/Face';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'; 

function Navbar () {
 const router = useRouter();

 const [onTop, setOnTop] = useState(true);
 useEffect(() => {
 window.addEventListener('scroll', handleScroll);
 });
 const handleScroll = () => {
 if(window.pageYOffset === 0) {
 setOnTop(true);
 } else {
 setOnTop(false);
 }
 }
 return (
 <>
 <Box sx={{ flexGrow: 1 }}>
 <AppBar color={onTop ? 'transparent' : 'inherit'}>
 <Toolbar>

 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
color="default">
 AutoMobile
 </Typography>
<Button color="inherit" onClick={() => router.push('/')}><HomeIcon color="secondary"/> Home </Button>

 <Button color="inherit" onClick={() =>
router.push('/voiture')}><ArticleIcon style={{ color: 'red' }}/> Voiture
</Button>
<Button color="inherit" onClick={() =>
router.push('/categorie')}><ArticleIcon style={{ color: 'green' }}/> Categorie
</Button>
<Button color="inherit" onClick={() =>router.push('/about')}><AllOutIcon color="primary"/> About </Button>
 <Button color="inherit" onClick={() =>
router.push('/login')}><FaceIcon style={{ color: 'green' }}/> Login </Button>
 <Button color="inherit" onClick={() =>
router.push('/')}><ExitToAppRoundedIcon style={{ color: 'gray' }}/> Logout
</Button>

 </Toolbar>
 </AppBar>
 </Box>
 <Toolbar />
 </>
 );
}
export default Navbar ; 