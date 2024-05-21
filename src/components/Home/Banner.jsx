
import {Box, Typography, styled} from "@mui/material"

const Dabba = styled(Box)`
    background : url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf83CnYdWFPrNJitkIvmLv62RVAiJ_P9GDOWrXjXrs7Q&s) ;
    height: 40vh;
    color : white;
    display: flex;
    align-items : center;
    flex-direction: column;
`

const Heading = styled(Typography)`
    color: white;
    font-size: 70px;
    padding: 10px;
`

const Typo = styled(Typography)`
    padding: 0;
    background-color: white;
    color: black;
    font-size: 20px;
    font-weight: bold;

`

const Banner = ()=>{
    return(
        
        <Dabba>
            <Heading>BLOG</Heading>
            <Typo>SAMYAK JAIN</Typo>
        </Dabba>
    )
}

export default Banner;