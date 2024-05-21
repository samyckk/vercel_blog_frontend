
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import axios from "axios";


const Component = styled(Box)`
    margin-top: 30px;
    background: #dbdbdb;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const accessToken = sessionStorage.getItem("access_token");
    const headers = {
        "Content-type": "application/json",
        "Authorization": `${accessToken}`,
    };

    const removeComment = ()=>{
        axios.delete(`https://vercel-blog-backend.vercel.app/deleteComment/${comment._id}`, {headers}).then(response=>{
            console.log("Comment Deleted");
            setToggle(prevState => !prevState);                      //prevState is same as toggle value but we have to import toggle from props.
        }).catch(error=>{
            console.log("Error on Deleting Comment");
        })
    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === sessionStorage.getItem('name') && <DeleteIcon style={{cursor : "pointer"}} color="error" onClick={removeComment}/> }
            </Container>
            <Typography style={{ textAlign: "left"}} >{comment.cmnt}</Typography>
        </Component>
    )
}

export default Comment;