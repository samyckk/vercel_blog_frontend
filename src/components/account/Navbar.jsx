
import { AppBar, Toolbar, styled } from "@mui/material"
import { Link } from "react-router-dom"

const Toolkit = styled(Toolbar)`
    display: flex;
    justify-content: center;
    & > a{
        padding : 10px;
        text-decoration : none;
        color : white;
    }
    
`

// const Link = styled(Typography)`
//     margin-left: 5%;
// `


const Navbar = ()=>{
    return(
        <AppBar>
            <Toolkit>
                <Link to = "/home/?cat=All" sx={{color:"red", background: "black"}}>HOME</Link>
                <Link to = "/about">ABOUT</Link>
                <Link to = "/contact">CONTACT</Link>
                <Link to = "/login">LOGOUT</Link>
            </Toolkit>
        </AppBar>
    )
}

export default Navbar