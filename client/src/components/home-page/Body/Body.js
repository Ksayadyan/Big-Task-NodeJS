//React main imports 
import React from 'react';
// Material-UI 
import SearchIcon from '@material-ui/icons/Search';
import Loading from '../../shared/loading/Loading';
//CSS
import './body.css';
// Body components renders HomePage body which includes search input and areas for search results 
class Body extends  React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
        <div className="home-page-body">
            <div>
                <div>
                    <label className="search-label">
                    <input type="search" className="inp" placeholder="type URL" onChange={this.props.change} name="search" value={this.props.value}/>
                        <SearchIcon onClick={this.props.urlFetch}/>

                    </label>
                    <h2 className="url-header">Enter URL to get HTML code</h2>
                </div>   
                <h2 className="url-header">URL search results</h2>
                <div className="search-results">
                {this.props.loading && 
                    <div className = 'Search-loading'>
                        <Loading/>
                    </div>
                 }
                    <p className="inspector-source-code"></p>
                    <p className="source-code"></p>
                
                    <button onClick={this.props.getSavedHtml}>Saved HTML</button>
                    <button onClick={this.props.saveHtml}>Save html</button>
        
                </div>
            </div>
        </div> 
        )
    }
}
export default Body;