import React from 'react';
import './body.css'

const Body = (props) => {
    return(
            <div className="home-page-body">
                <h2 className = 'url-header'>URL search results </h2>
                <div className = 'search-results'>
                    <p className = 'inspector-source-code'>
                    </p>
                    <p className = 'source-code'>
                    </p>
                </div>
            </div> 
    )
}
export default Body;