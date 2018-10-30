import React from 'react';
import Pagination from '../pagination/Pagination';

class Search_Group extends React.Component{
    constructor(){
    super();
    this.state = {
        groups : [],
        page : 1,
        totalpages : 10,
        className : 'Pagination',
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
        className : "block"
      })
      console.log(get)
    })
    .catch((error)=>{
        console.log(error)
    })
  } 
  render(){
      const {page , totalpages , groups , className} = this.state;
      return(
        <div className="search-history-body">
          <div className="groupHistory">
        <button className="handleGroup-button" onClick={this.handeleGroupHistory}>Groups History</button>
        <button className="handleGroup-button" onClick={()=>{this.setState({
          groups : [],
          className : 'Pagination'
        })}}>clear</button>
      
        <div className="history-result">
          {groups.map((group)=>(
            <ul>
              <li>{group.groupName}</li>
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
