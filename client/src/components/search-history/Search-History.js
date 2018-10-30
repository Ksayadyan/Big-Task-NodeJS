import React from 'react';
import './searchHistory.css';
import Header from '../home-page/Header/Header';
import Search_Group from './search-group-component/Search-Group';

class Search_History extends React.Component{
  constructor(){
    super();
    this.state = {
      user : null,

    }
  }


  render() {
    return (
      <div>
          <Header />
          <Search_Group/>
      </div>
    );
  }
};

export default Search_History;
    