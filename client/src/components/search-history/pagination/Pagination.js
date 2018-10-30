import React from 'react';
import './pagination.css';

const Pagination = (props)=>{
    const {page, totalPages, handlePaginationClick} = props
    return (
        <div className = {props.className}>
            <button disabled = { page <= 1 }  className = "Pagination-button" onClick = {()=>handlePaginationClick("prev") }>&larr;</button>
            <span className = "Pagination-info" > page <b>{page} of {totalPages}</b> </span>
         
            <button disabled={page >= totalPages} className="Pagination-button" onClick = {()=>handlePaginationClick("next")}>&rarr;</button>
        </div>
    )
};

export default Pagination