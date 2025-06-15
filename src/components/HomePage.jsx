import React from 'react'
import JavaScript from '../assets/JavaScript.png';
import Bash from '../assets/bash.png';
import C from '../assets/C.png';
import cpp from '../assets/C++.png';
import csharp from '../assets/Csharp.png';
import Go from '../assets/Go.png';
import R from '../assets/R.png';
import php from '../assets/php.png';
import Python from '../assets/Python.png';
import Java from '../assets/Java.png';
import Ruby from '../assets/ruby.png';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
      const navigate = useNavigate();
    let langauges = [
        {
            id: 'js',
            name: 'JavaScript',
            image: JavaScript
        },
        {
            id: 'js',
            name: 'Bash',
            image: Bash
        },
        {
            id: 'js',
            name: 'cpp',
            image:cpp
        },
        {
            id: 'js',
            name: 'C',
            image: C
        },
        {
            id: 'js',
            name: 'CSharp',
            image: csharp
        },
        {
            id: 'js',
            name: 'Java',
            image: Java
        },
        {
            id: 'js',
            name: 'R',
            image: R
        },
        {
            id: 'js',
            name: 'PHP',
            image: php
        },
        {
            id: 'js',
            name: 'ruby',
            image: Ruby
        },
        {
            id: 'js',
            name: 'python',
            image: Python
        },
        {
            id: 'js',
            name: 'Go',
            image: Go
        },
    ]
    return (
        <>
        <div className='d-flex justify-content-center'>
        
            <h1 class="text-center snippet-title m-3" style={{fontFamily:'cursive'}}> Snippet Hub</h1>
               
            </div>
           
            
            <div className="container mt-3">
                <div className="row">
                    {langauges.map(tech => (
                        <div className="tech-card col-md-3 mb-4" key={tech.name} style={{borderRadius:'50%'}}>
                            <div className=" card text-center h-100 shadow-sm" style={{backgroundColor:'#ebebef8c'}}>
                                <img src={tech.image} className="logo p-4" alt={tech.name} onClick={()=> navigate('/code-snippet',{state:{search:tech.name}})}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
 <h6 class="text-center text-muted mt-2">Browse, save, and manage code snippets across your favorite technologies</h6>
        </>
    )
}

export default HomePage