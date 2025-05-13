import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeSnippets from './codesnippets';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
import Searchsnipet from './searchsnipet';
import { useCodeSnippets } from '../stores/CodeSnippetContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCoffee } from '@fortawesome/free-solid-svg-icons';

const CodeSnippet = () => {

    const { snippets } = useCodeSnippets();
    console.log('snippets', snippets)
    const codesnipepts = snippets || [];
    console.log(' code snippets', snippets)
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredSnippets, setFilteredSnippets] = useState(codesnipepts);
    console.log('codesnippets', codesnipepts)
    console.log('filteredSnippets', filteredSnippets)

    const options = [5, 10, 15, 20, 25, 30];
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = useMemo(() => {
        return Math.ceil(filteredSnippets.length / itemsPerPage);
    }, [filteredSnippets, itemsPerPage]);

    const paginatedSnippets = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredSnippets.slice(startIndex, endIndex);
    }, [filteredSnippets, currentPage, itemsPerPage]);

    // Handlers
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(0); // reset to first page when changing items per page
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    useEffect(() => {
        fetchFilteredSnippets();
    }, [searchQuery])

    const fetchFilteredSnippets = () => {
        console.log('search', searchQuery)
        if (searchQuery && searchQuery.trim() !== '') {
            const filteredSnippets = codesnipepts?.filter((code) =>
                code.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || code.language.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
            console.log('filtered snippets', filteredSnippets);
            setFilteredSnippets(filteredSnippets)
        }
        else {
            setFilteredSnippets(codesnipepts)
        }
    }

    const handleNavigate = (code) => {
        console.log('Navigating to view snippet...');
        navigate('/view-snippet', { state: { code } });
    };

    return (
        <div className='code-snippet m-4'>
            <div className='row snippet-title' > Snippet Hub</div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <Searchsnipet onSearch={(query) => setSearchQuery(query)} />
                <Button variant="primary" onClick={() => navigate('/create-snippet')} className='m-3'>
                    Add</Button>
            </div>
            <Card>

                {/* {filteredSnippets?.length > 0 ? (
                        filteredSnippets?.map((code) => (
                            <Card key={code.id} className='col-lg-2 col-md-3 col-sm-4 col-xs-4 m-3 ms-4' >
                                <CardHeader >
                                    <p className='d-flex justify-content-center align-items-center m-0 p-0'>{code.title} </p>
                                    <span className='d-flex justify-content-center align-items-center '>({code.category})</span>
                                </CardHeader>
                                <CardBody style={{ height: '150px', overflow: 'hidden' }}>
                                    <pre>
                                        <code>{code.code}</code>
                                    </pre>
                                </CardBody>
                                <CardFooter >
                                    <div className='d-flex justify-content-end'>
                                        <CardFooter >
                                            <div className='d-flex justify-content-end'>
                                                <i class="bi bi-box-arrow-up-right" onClick={() => handleNavigate(code)}></i>
                                            </div>
                                        </CardFooter>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className='d-flex justify-content-center'> No code Snippets Available</p>
                    )

                    } */}

                <div className="row m-3 ">
                    {filteredSnippets?.length > 0 ? (filteredSnippets?.slice(
                        currentPage * itemsPerPage,
                        (currentPage + 1) * itemsPerPage
                    ).map((code) => (
                        <div key={code.id} className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12 m-3 ">
                            <Card className="h-100">
                                <CardHeader className="text-center">
                                    <p className="m-0 fw-bold">{code.title}</p>
                                    <span className="text-muted">({code.category})</span>
                                </CardHeader>

                                <CardBody style={{ height: '150px', overflow: 'hidden' }}>
                                    <pre className="m-0">
                                        <code>{code.code}</code>
                                    </pre>
                                </CardBody>

                                <CardFooter className="d-flex justify-content-end">
                                    <i className="bi bi-box-arrow-up-right"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleNavigate(code)}
                                        title="View"></i>
                                </CardFooter>
                            </Card>
                        </div>
                    ))) : (
                        <p className='d-flex justify-content-center'> No code Snippets Available</p>

                    )}
                </div>
            </Card>
            {/* <div>
                <div className="d-flex justify-content-between mt-3">
                    <select
                        className="form-select w-auto"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className='d-flex justify-content-end mt-3'>
                        {filteredSnippets?.length > 0 && totalPages > 0 && (
                            <span>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    onClick={() => {
                                        if (currentPage > 0) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                    className={currentPage === 0 ? 'text-muted pointer-none' : 'cursor-pointer'}
                                />{' '}
                                {currentPage + 1} of {totalPages}{' '}
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    onClick={() => {
                                        if (currentPage < totalPages - 1) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }}
                                    className={currentPage === totalPages - 1 ? 'text-muted pointer-none' : 'cursor-pointer'}
                                />
                            </span>
                        )}
                    </div>
                </div>

            </div> */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {filteredSnippets.length > 0 && (
                    <>
                        <select
                            className="form-select w-auto"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <div className="d-flex align-items-center">
                            <span>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    onClick={handlePrevious}
                                    className={`me-2 ${currentPage === 0 ? 'text-muted pointer-none' : 'cursor-pointer'}`}
                                />
                                {currentPage + 1} of {totalPages}
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    onClick={handleNext}
                                    className={`ms-2 ${currentPage === totalPages - 1 || totalPages === 0
                                        ? 'text-muted pointer-none'
                                        : 'cursor-pointer'
                                        }`}
                                />
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>

    )
}

export default CodeSnippet;