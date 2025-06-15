import React, { useEffect, useState } from 'react'
import { Form, FormControl, Button } from "react-bootstrap";
const Searchsnipet = ( { onSearch }) => {
    const [searchTerm,setSearchTerm] = useState('');

    const handleSearch = (e) =>{
        console.log('sear',e.target.value)
        e.preventDefault();
        setSearchTerm(e.target.value)
        onSearch(e.target.value);
    }

    return (
        <div>
            <Form >
                <FormControl
                    type="search"
                    placeholder="Search..."
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form>
        </div>
    )
}

export default Searchsnipet;