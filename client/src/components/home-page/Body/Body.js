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
        this.state = {
            comparedata : null
        }
    this.compareHtml = this.compareHtml.bind(this)
    }

    drawer(arr){
        let obj = {
            added : [],
            removed : []
        } ;

        // for (let i = 0; i < arr.length ; i++){
        //     if(arr[i].added){
        //         obj.added += arr[i].value
        //     }else{
        //         obj.removed += arr[i].value
        //     }
        // }

        for (let i = 0 ; i < arr.length ; i++){
            if(arr[i].added){
                obj.added.push(arr[i].value)
            }else{
                obj.removed.push(arr[i].value)
            }
        }
        return (<div className="compare">
                    <ul className="added">
                        {obj.added.map((tag) => {
                        let splitAddedArr = tag.split('>');
                        let tox = splitAddedArr.map((tag)=>{
                                return <li>{tag + '>'}</li>
                            })
                            return tox
                        //    return <li>{tag}</li>
                        //     // console.log(tag)
                        })}
                    </ul>

                    <ul className="removed">
                         {obj.removed.map((valueRemove) => {
                        let splitRemovedArr = valueRemove.split('>');
                        let changeList = splitRemovedArr.map((remove)=>{
                                return <li>{remove + '>'}</li>
                            })
                            return changeList;                            
                         
                            // console.log(tag)
                        })}
                    </ul>
                </div>
            );

        // return  (
        //     <ul className="compare">
        //         {obj.added.map((tag) => {
        //      return <li>{tag}</li>
        // })}
        //     </ul>
        // )
        
    }

    compareHtml(){
        let data = {
            url : `${this.props.value}`
        }
        fetch('/compare', {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : this.props.token

            }
        })
        .then(res => res.json())
        .then((resData) => {

            let newArr = resData.filter((element) =>{
                if(!element.added && !element.removed){
                    return false
                }else{
                    return true
                }
            })
            
            this.setState({
            comparedata : newArr
        })})
        .catch((err) => {
            console.log(err)
        })
    }

    render(){

        console.log(this.state.comparedata)


        const {urlFetch, change, value, getSavedHtml, saveHtml} = this.props;

        if(this.state.comparedata){
            return this.drawer(this.state.comparedata)
        }
    return(
        <div className="home-page-body">
            <div>
                <div>
                    <label className="search-label">
                    <input type="search" className="inp" placeholder="type URL" onChange={change} name="search" value={value}/>
                        <SearchIcon onClick={urlFetch}/>

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
                
                    <button onClick={getSavedHtml}>Saved HTML</button>
                    <button onClick={saveHtml}>Save html</button>
                    <button className="compare-button" onClick={this.compareHtml}>Compare HTML</button>
        
                </div>
            </div>
        </div> 
        )
    }
}
export default Body;