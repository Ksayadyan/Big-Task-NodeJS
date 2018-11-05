import React from 'react';
import './slideShow.css';


class SlideShow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            images : [],
            user: JSON.parse(localStorage.user),
        }
    }
    componentWillMount = () => {
        const {token} = this.props
        fetch('/getImages?page=1',{
            headers : {
                'Authorization' : token,
            },
            method : 'GET',
        }).then(res => res.json())
        // .then(get => console.log(get[0].images))
        .then(get => this.setState({images : get[0].images}))
        .catch(err => console.log(err))
    }
    render(){
        const images = this.state.images;
        return(
            <div className="slide-show">

            {images.map((image) => (
                <ul>
                    {console.log(image)}
                    { <li><img alt="saved picture" src={`${image}?token=${this.state.user.token}`}/></li>}
                </ul>
            ))}
            </div>

        )
    }
}
export default SlideShow;