import React from 'react';

class Group_Url extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page : 1,
            urls : [],
        }
        this.handleGroupUrls = this.handleGroupUrls.bind(this);
        this.clearField = this.clearField.bind(this);
    }
    handleGroupUrls = ()=>{
        const {value, token} = this.props;
        const {page} = this.state;
        fetch(`/browseGroupedUrlHistory?groupName=${value}&page=${page}&perPage=5&order=groupName&type=DESC`,{
            method : 'GET',
            headers : {
                'Authorization' : token,
            }
        })
        .then(res => {
            return res.json()
        })
        .then(get =>{
            this.setState({
                urls : get.rows,
                count : get.count 
            })
            console.log(get)
        })
        .catch(error => console.log(error))

    }

    clearField = ()=>{
        this.setState({
            urls : []
        })
    }
    render(){
        const {urls} = this.state;
        const{value} = this.props;
        return(
            <div className="group-url-history">
                <li onMouseEnter={this.handleGroupUrls} onMouseLeave={this.clearField}>{value}</li>
                <div className="group-history-container">
                    {urls.map((url)=>(
                        <ul>
                            <li>{url.url}</li>
                        </ul>
                    ))}
                </div>
            </div>
        )
    }
}
export default Group_Url;