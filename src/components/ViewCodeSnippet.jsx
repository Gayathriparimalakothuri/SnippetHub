import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useLocation } from 'react-router-dom';
import { Badge, Button, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCodeSnippets } from '../stores/CodeSnippetContext';

function ViewCodeSnippet() {
    const location = useLocation();
    const { dispatch } = useCodeSnippets();
    const [code, setCode] = useState(location.state.code.code.replace(/\\n/g, '\n'));
    const [language, setLanguage] = useState(location.state.code.language);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState([]);
    const [editorOptions, setEditorOptions] = useState({
        selectOnLineNumbers: true,
        automaticLayout: true,
        readOnly: true,
    });
    const [showInvalidPopup, setShowInvalidPopup] = useState(false);
    const [isModalClosed, setIsModalClosed] = useState(false);
    const editorRef = useRef(null);

    const title = location.state.code.title;
    const id = location.state.code.id;
    const languageKeywords = {
        c: [
            'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
            'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
            'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof',
            'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void',
            'volatile', 'while'
        ],
        cpp: [
            'alignas', 'alignof', 'and', 'and_eq', 'asm', 'auto', 'bool', 'break',
            'case', 'catch', 'char', 'char16_t', 'char32_t', 'class', 'compl',
            'const', 'const_cast', 'constexpr', 'continue', 'decltype', 'default',
            'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'export',
            'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline',
            'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'not',
            'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected',
            'public', 'register', 'reinterpret_cast', 'return', 'short', 'signed',
            'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch',
            'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef',
            'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void',
            'volatile', 'wchar_t', 'while'
        ],
        csharp: [
            'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch',
            'char', 'checked', 'class', 'const', 'continue', 'decimal', 'default',
            'delegate', 'do', 'double', 'else', 'enum', 'event', 'explicit',
            'extern', 'false', 'finally', 'fixed', 'float', 'for', 'foreach',
            'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal',
            'is', 'lock', 'long', 'namespace', 'new', 'null', 'object', 'operator',
            'out', 'override', 'params', 'private', 'protected', 'public',
            'readonly', 'ref', 'return', 'sbyte', 'sealed', 'short', 'sizeof',
            'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw',
            'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe',
            'ushort', 'using', 'virtual', 'void', 'volatile', 'while'
        ],
        java: [
            'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch',
            'char', 'class', 'const', 'continue', 'default', 'do', 'double',
            'else', 'enum', 'exports', 'extends', 'final', 'finally', 'float',
            'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int',
            'interface', 'long', 'native', 'new', 'package', 'private',
            'protected', 'public', 'return', 'short', 'static', 'strictfp',
            'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
            'transient', 'try', 'void', 'volatile', 'while'
        ],
        python: [
            'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
            'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
            'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
            'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield','print'
        ],
        javascript: [
            'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case',
            'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default',
            'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends',
            'false', 'finally', 'float', 'for', 'function', 'get', 'goto', 'if',
            'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let',
            'long', 'native', 'new', 'null', 'of', 'package', 'private', 'protected',
            'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized',
            'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof',
            'var', 'void', 'volatile', 'while', 'with', 'yield', 'console'
        ],
        ruby: [
            '__ENCODING__', '__LINE__', '__FILE__', 'alias', 'and', 'begin',
            'break', 'case', 'class', 'def', 'defined?', 'do', 'else', 'elsif',
            'end', 'ensure', 'false', 'for', 'if', 'in', 'module', 'next', 'nil',
            'not', 'or', 'redo', 'rescue', 'retry', 'return', 'self', 'super',
            'then', 'true', 'undef', 'unless', 'until', 'when', 'while', 'yield'
        ],
        php: [
            '__CLASS__', '__DIR__', '__FILE__', '__FUNCTION__', '__LINE__',
            '__METHOD__', '__NAMESPACE__', 'abstract', 'and', 'array', 'as',
            'break', 'callable', 'case', 'catch', 'class', 'clone', 'const',
            'continue', 'declare', 'default', 'die', 'do', 'echo', 'else',
            'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif',
            'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'final',
            'finally', 'fn', 'for', 'foreach', 'function', 'global', 'goto',
            'if', 'implements', 'include', 'include_once', 'instanceof',
            'insteadof', 'interface', 'isset', 'list', 'match', 'namespace',
            'new', 'or', 'print', 'private', 'protected', 'public', 'readonly',
            'require', 'require_once', 'return', 'static', 'switch', 'throw',
            'trait', 'try', 'unset', 'use', 'var', 'while', 'xor', 'yield'
        ],
        go: [
            'break', 'case', 'chan', 'const', 'continue', 'default', 'defer',
            'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import',
            'interface', 'map', 'package', 'range', 'return', 'select', 'struct',
            'switch', 'type', 'var'
        ],
        r: [
            'if', 'else', 'for', 'while', 'repeat', 'break', 'next', 'return',
            'function'
        ],
        powershell: [
            'if', 'else', 'elseif', 'switch', 'foreach', 'for', 'while', 'do',
            'until', 'break', 'continue', 'return', 'throw', 'trap'
        ],
        bash: [
            'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done',
            'case', 'esac', 'function'
        ]
    };

    useEffect(() => {
        if (isModalClosed) return;
        console.log('isedit', isEdit, language);
        if (isEdit) {
            setEditorOptions((prevOptions) => ({ ...prevOptions, readOnly: false }));
            setCode(code.replace(/\\n/g, ''));
            setLanguage(language);
        }
        else {
            setEditorOptions((prevOptions) => ({ ...prevOptions, readOnly: true }));
        }
        console.log('code', code,);
    }, [isEdit]);


    // const handleCodeChange = (newValue) => {
    //     // const errors = validateCode(newValue, language);
    //     // if (errors.length > 0) {
    //     //     setErrors(errors);
    //     //     setShowInvalidPopup(true);
    //     // }
    //     const errors = validateCode(newValue, language);
    //     if (errors) {
    //         setShowInvalidPopup(true);
    //     } else {
    //         setShowInvalidPopup(false);
    //     }

    //     setCode(newValue);
    // }
    const handleCodeChange = (newValue) => {
        setCode(newValue);
        const errors = validateCode(newValue, language);
        console.log('errors', errors);
        if (errors) {
            setShowInvalidPopup(true);
        } else {
            setShowInvalidPopup(false);
        }
    };

    const validateCode = (code, selectedLanguage) => {
        const errors = [];
        console.log('code', code, selectedLanguage);
        // Object.keys(languageKeywords).forEach((lang) => {
        //     if (lang !== selectedLanguage) {

        //         languageKeywords[lang].forEach((keyword) => {
        //             console.log(code.includes(keyword), keyword, lang);
        //             if (code.includes(keyword)) {
        //                 console.log('keyword',code, keyword, lang);
        //                 errors.push({
        //                     message: `Invalid ${keyword} in ${selectedLanguage}`,
        //                     severity: 'error',
        //                 });
        //             }
        //         });
        //     }
        // });
        Object.keys(languageKeywords).forEach((lang) => {
            if (lang !== selectedLanguage) {
                languageKeywords[lang].forEach((keyword) => {
                    if (!languageKeywords[selectedLanguage].includes(keyword)) {
                        console.log('Checking keyword:', keyword, 'in', lang, 'against', selectedLanguage, 'keywords:', languageKeywords[selectedLanguage]);

                        const regex = new RegExp(`\\b${keyword}\\b`);
                        if (regex.test(code)) {
                            console.log('Invalid keyword found:', keyword, 'in', lang);
                            errors.push({
                                message: `Invalid keyword '${keyword}' in ${selectedLanguage}`,
                                severity: 'error',
                            });
                        }
                    }
                });
            }
        });
        return errors.length > 0 ? errors : null;
    };
    useEffect(() => {
        if (editorRef.current) {
            const model = editorRef.current.getModel();
            monaco.editor.setModelLanguage(model, language);
        }
    }, [language]);

    const handleUpdate = () => {
        setIsEdit(!isEdit)
        const updatedSnippet = {
            id: id,
            title,
            code,
            language,
            updatedTime: new Date().toISOString(),
            category: language.charAt(0).toUpperCase() + language.slice(1),
        };
        console.log('updated snippet', updatedSnippet);
        dispatch({ type: 'UPDATE_SNIPPET', payload: updatedSnippet });
        toast.success('Snippet updated successfully!');
       window.history.back();
    };

    // Delete snippet
    const handleDelete = () => {
        dispatch({ type: 'DELETE_SNIPPET', payload: id });
        toast.success('Snippet deleted successfully!');
        window.history.back();
    };

    return (
        <>
            <div className='d-flex justify-content-between my-3 me-3'>
                <Badge bg="secondary" className='mx-3'>{language.charAt(0).toUpperCase() + language.slice(1)}</Badge>
                <div className='d-flex justify-content-end'>
                    <Button className='me-2' variant='secondary' onClick={() => window.history.back()}>Back</Button>
                    <Button onClick={() => {
                        if (isEdit) {
                            handleUpdate();
                        }
                        setIsEdit(!isEdit);
                    }
                    }>{isEdit ? "Update" : "Edit"}</Button>
                    <Button className='ms-2'variant='danger' onClick={()=>{
                        confirm("Are you sure you want to delete this snippet?") && handleDelete();
                    }}>Delete</Button>
                </div>

            </div>

            <Card>

                <Editor
                    height="80vh"
                    language={language}
                    value={code}
                    onChange={(newValue) => handleCodeChange(newValue)}
                    options={editorOptions}
                />
                {/* Error Display Section */}
                {errors.length > 0 && (
                    <div className="mt-3">
                        <h5>Errors Detected:</h5>
                        <ul>
                            {errors.map((err, index) => (
                                <li key={index}>
                                    {err.message} (Line {err.startLineNumber})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                {/* <Modal show={showInvalidPopup} onHide={() => setShowInvalidPopup(false)} onExited={() => {
                    setIsEdit(false);
                    setCode(location.state.code.code.replace(/\\n/g, '\n'));
                    setEditorOptions((prevOptions) => ({ ...prevOptions, readOnly: true }));
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invalid Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The code you entered is invalid for the selected language (<strong>{language}</strong>).<br />
                        Please correct the syntax errors.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowInvalidPopup(false)
                            setIsEdit(false);
                            setCode(location.state.code.code.replace(/\\n/g, '\n'));
                            setEditorOptions((prevOptions) => ({ ...prevOptions, readOnly: true }));
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> */}
                <Modal show={showInvalidPopup} onHide={() => {
                    setShowInvalidPopup(false);
                     setIsEdit(false);
                            setCode(location.state.code.code.replace(/\\n/g, '\n'));
                }} >
                    <Modal.Header closeButton>
                        <Modal.Title>Invalid Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The code you entered is invalid for the selected language (<strong>{language}</strong>).<br />
                        Please correct the syntax errors.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowInvalidPopup(false);
                            setIsEdit(false);
                            setCode(location.state.code.code.replace(/\\n/g, '\n'));
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </>


    );
}



export default ViewCodeSnippet;