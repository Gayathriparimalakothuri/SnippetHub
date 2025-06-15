import { useState } from 'react'
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Searchsnipet from './components/searchsnipet';
import CodeSnippets from './components/codesnippets';
import CodeSnippet from './components/codesnippet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewCodeSnippet from './components/ViewCodeSnippet';
import CreateCodeSnippet from './components/CreateCodeSnippet';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/HomePage';

function App() {

 
  return (
    <>
    {/* <BrowserRouter>
      <p>Hello world</p>
      <CodeSnippet code={CodeSnippets} />
    </BrowserRouter> */}
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Routes>
        {/* <Route path="/" element={<CodeSnippet />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/view-snippet" element={<ViewCodeSnippet />} />
        <Route path="/code-snippet" element={<CodeSnippet />} />
        <Route path="/create-snippet" element={<CreateCodeSnippet />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
