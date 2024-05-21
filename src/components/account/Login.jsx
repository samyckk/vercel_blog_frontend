import { useEffect, useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// STYLES
const Component = styled(Box)`
    margin: auto;
    padding: 30px;
    width: 400px;
    box-shadow: 5px 2.5px 5px 2.5px rgb(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    text-transform: none;
`;
const Wrapper = styled(Box)`
    display: flex;
    text-transform: none;
    flex-direction: column;
    & > div, & > button, p {
        margin-top: 15px;
        text-transform: none;
    }
`;
const Image = styled('img')({
    margin: 'auto',
    width: '50%'
});
const Overlay = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;
const CenteredDiv = styled(Box)`
    z-index: -1;
    height: 400px;
    img {
        height: 100%;
    }
`;

// Object / Variables
const signupInitial = {
    name: '',
    username: '',
    password: ''
};

const loginInitial = {
    username: '',
    password: ''
};

// RENDER
const Login = ({ setIsAuthenticated }) => {
    // HOOKS
    const [account, setAccount] = useState("login");
    const [signup, setSignup] = useState(signupInitial);
    const [login, setLogin] = useState(loginInitial);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsAuthenticated(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();

    // Functions
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleButton = () => {
        if (account === "login") {
            setAccount("signup");
        } else {
            setAccount("login");
        }
    };

    // API CALLS
    const signupCall = () => {
        axios.post("https://vercel-blog-backend.vercel.app/signup", signup)
            .then(response => {
                setSignup(signupInitial);
                setLogin(loginInitial); // Reset login state
                setAccount("login");
            })
            .catch(error => {
                alert("Make sure Signup Format is correct");
            });
    };

    const loginCall = () => {
        setIsLoading(true);
        axios.post('https://vercel-blog-backend.vercel.app/login', login).then(response => {
            sessionStorage.setItem("access_token", `bearer ${response.data.accessToken}`);
            sessionStorage.setItem("refresh_token", `bearer ${response.data.refreshToken}`);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("username", response.data.username);
            setIsAuthenticated(true);
            navigate("/home/?cat=All");
        }).catch(error => {
            setIsLoading(false);
            console.log("error while calling login call in front end");
            alert(error.response.data.msg); 
        });
    };

    return (
        <>
            {isLoading && (
                <Overlay>
                    <CenteredDiv>
                        <img src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif" alt="loader" />
                    </CenteredDiv>
                </Overlay>
            )}
            <Component>
                <Image src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="logo" />
                {
                    account === "login" ?
                        <Wrapper>
                            <TextField value={login.username} label="Username" variant="standard" onChange={onValueChange} name='username' />
                            <TextField value={login.password} label="Password" variant="standard" onChange={onValueChange} name='password' type='password' />
                            <Button variant="contained" onClick={loginCall}>Login</Button>
                            <Typography>OR</Typography>
                            <Button variant="text" onClick={handleButton}>New to .blog?</Button>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField id="filled-basic" label="Name" onChange={onInputChange} name='name' variant="filled" />
                            <TextField id="filled-basic" label="Username" onChange={onInputChange} name='username' variant="filled" />
                            <TextField id="filled-basic" label="Password" onChange={onInputChange} name='password' variant="filled" type='password' />
                            <Button variant="contained" onClick={signupCall}>Sign Up</Button>
                            <Typography>OR</Typography>
                            <Button variant="text" onClick={handleButton}>Already have an account?</Button>
                        </Wrapper>
                }
            </Component>
        </>
    );
};

export default Login;
