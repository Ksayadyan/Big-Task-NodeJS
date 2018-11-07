import React from 'react';
import Pagination from '../../search-history/pagination/Pagination';
import './slideShow.css';


class SlideShow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            images : [],
            page : 1,
            className : 'Pagination'
        }
        this.handlePaginationClick=this.handlePaginationClick.bind(this);
        
    }

    showSlideBar = () => {
        const {token} = this.props;
        const page = this.state.page;
        console.log(page)
        fetch(`/getImages?page=${page}`,{
            headers : {
                'Authorization' : token,
            },
            method : 'GET',
        }).then(res => res.json())
        // .then(get => console.log(get[0].images))
        .then(get => this.setState({
                images : get[0].images,
                className : 'block'}))
        .then(()=>{console.log(this.state.images)})
        .catch(err => console.log(err))
    }
    handlePaginationClick (direction){
        let nextPage = this.state.page;
        nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
        this.setState({page : nextPage
        }, () => {this.showSlideBar()});
      
    }
    render(){
        const {images, user, page, className} = this.state;
        const token = this.props.token;
        return(
            <div className="slide-show">
            <button onClick={this.showSlideBar}>Show image Slidebar</button>
            <ul>
                {images.map((image) => (

                    <li><img alt="saved picture" src={`${image}?token=${token}`}/></li>    
                ))}
            </ul>
                <Pagination page={page} handlePaginationClick={this.handlePaginationClick} className={className}/>
            </div>

        )
    }
}
export default SlideShow;