import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useCodeSnippets } from '../stores/CodeSnippetContext';
import { toast } from "react-toastify";

const CreateCodeSnippet = () => {
  const { dispatch } = useCodeSnippets();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');

  const handleClear = () => {
    setTitle('');
    setLanguage('');
    setCode('');
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!title.trim() || !language.trim() || !code.trim()) {
      toast.error('All fields are required!');
      return;
    }
    const formData = {
      id: uuidv4(),
      title,
      language,
      code,
      category: language.charAt(0).toUpperCase() + language.slice(1),
      createdAt: new Date().toISOString(),
    };
    dispatch({
      type: 'ADD_SNIPPET',
      payload: { ...formData },
    });
    handleClear();
     toast.success('Snippet added successfully!');
    // redirect back (1 step back)
    setTimeout(() => {
      window.history.back();
      // or navigate(-1);
    }, 500); // small delay to let toast show
    console.log('Form submitted', formData);
  }
  return (
    <div className="container-fluid d-flex flex-column ">
            <div className='row snippet-title' > Add Snippet</div>

      <div className="row p-3">
        <div className="col d-flex justify-content-end">
          <Button variant="secondary" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center mt-3">
        <div className="card shadow">
          <Form onSubmit={handleSubmit} className="row p-4">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Snippet Title</Form.Label>
                <Form.Control type="text" placeholder="Enter code snippet" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Language</Form.Label>
                <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="" disabled>Select Language</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="ruby">Ruby</option>
                  <option value="bash">Bash</option>
                  <option value="go">Go</option>
                  <option value="r">R</option>
                  <option value="php">PHP</option>
                  <option value="csharp">CSharp</option>
                  <option value="c">C</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group >
                <Form.Label>Code Snippet</Form.Label>
                <Form.Control as="textarea"
                  spellCheck="false"
                  rows={3}
                  placeholder="Enter code snippet"
                  value={code}
                  onInput={(e) => {
                    e.target.style.height = 'auto'; // reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // set to scrollHeight
                  }}
                  style={{ overflowY: 'auto', maxHeight: '200px' }}
                  onChange={(e) => { setCode(e.target.value) }}
                />
              </Form.Group>
            </div>
            <div className="row d-flex justify-content-center align-items-center m-3">
              <div className="col-lg-1 col-md-1 col-sm-3 col-xs-3 ">
                <Button className='' type="submit">Submit</Button>
              </div>
            </div>
          </Form>

        </div>
      </div>
    </div>
  )
}

export default CreateCodeSnippet;