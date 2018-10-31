import React from 'react';
import Pagination from '../pagination/Pagination';
import Group_Url from './Search-Group-Url';
import Loading from '../../shared/loading/Loading';

class Search_Group extends React.Component{
    constructor(){
    super();
    this.state = {
        groups : [],
        page : 1,
        totalpages : 10,
        className : 'Pagination',
        loading : false,
        }
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }
  componentWillMount = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({user:user});
  }
  handlePaginationClick (direction){
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({page : nextPage
             // call fetchCurrencies function inside setStates callback   
    }, ()=>{  this.handeleGroupHistory();});
  
}
  handeleGroupHistory = () => {
    const {page} = this.state
    const token = this.state.user.token;
    this.setState({
      loading : true,
    })
    fetch(`/browseGroupHistory?page=${page}&perPage=5&order=groupName&type=DESC`,{
      method : 'GET',
      headers : {
        'Authorization' : token,
      }
    })
    .then(res => {
      return res.json();
    })
    .then(get => {
      this.setState({
        groups : get.rows,
        counts : get.count,
        className : "block",
        loading : false,
      })
      console.log(get)
    })
    .catch((error)=>{
        console.log(error)
    })
  } 
  render(){
      const {page , totalpages , groups , className, loading} = this.state;
      return(
        <div className="search-history-body">
          <div className="groupHistory">
        <button className="handleGroup-button" onClick={this.handeleGroupHistory}>Groups History</button>
        <button className="handleGroup-button" onClick={()=>{this.setState({
          groups : [],
          className : 'Pagination'
        })}}>clear</button>
      
        <div className="history-result">
        {loading && 
                    <div className = 'Search-loading'>
                        <Loading/>
                    </div>
                 }
          {groups.map((group)=>(
            <ul>
              <Group_Url value={group.groupName} token={this.state.user.token}/>
            </ul>
            ))}
              <Pagination className = {className} page={page} totalpages={totalpages} handlePaginationClick = {this.handlePaginationClick}/>
        </div>
          </div> 
    </div>
      )
  }
}
export default Search_Group;
