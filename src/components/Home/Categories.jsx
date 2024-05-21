import Button from '@mui/material/Button';
import { styled, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Btn = styled(Button)`
    background-color: blue;
    color: white;
    margin: 5px;
    &:hover{
        background-color: black;
    }
`

const StyledTable = styled(Table)`
    border: 0.5px solid rgba(150,150,150,1);
`

const cate= [
    "Music",
    "Sports",
    "Movies",
    "Technology",
    "Fashion",
    "General"
]

const Categories = () => {

    let [searchParams] = useSearchParams();
    let category = searchParams.get('cat');
    const [canCreate, setCanCreate] = useState(category !== "All");

    useEffect( ()=>{
        setCanCreate(category !== "All");
    }, [category] );

    // setCategory(searchQuery.get("cat"));

    return (
        <>  
            {
                canCreate ?(
                    <Link to={`/create/?cat=${category}`}>
                        <Btn >Create Blog</Btn>
                    </Link>
                ):
                (
                    <Btn onClick={()=>{alert("Select Category from the list to create a Blog")}}>Select Category to Create a Blog</Btn>
                )

            }
              

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell> 
                            <Link to="/home/?cat=All" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                                All Categories
                            </Link>
                            
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {cate.map(category => (
                        <TableRow key={category}>
                                <TableCell>
                                    <Link to={`/home/?cat=${category}`} style={{ textDecoration: 'none',color: 'inherit', fontWeight: 'bold' }}>{category}</Link>
                                </TableCell>
                            
                            
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
}

export default Categories;
