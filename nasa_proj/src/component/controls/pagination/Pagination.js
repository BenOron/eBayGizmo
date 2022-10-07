import React from 'react'
import './pagination.css'
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)



    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav style={{textAlign:'center'}}>
            <ul className='pagination'>
                <li className="page-item">
                    <button className="likeLink"
                       onClick={prevPage}
                      >

                        Previous
                    </button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >
                        <button onClick={() => setCurrentPage(pgNumber)}
                           className='likeLink'>
                            {pgNumber}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button className="likeLink" onClick={nextPage} >Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination