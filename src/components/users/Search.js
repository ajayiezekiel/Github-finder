import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Search extends Component {
    state = {
        text: "",
        show: false
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please enter something', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({text: '', show: true});
        }
    }
    onClick = () => {
        this.props.clearUsers();
        this.setState({show: false})
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input type="text" name="text" 
                    placeholder="Search profiles ...." 
                    value={this.state.text} 
                    onChange={this.onChange}
                     />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                { this.state.show && (<button className='btn btn-light btn-block' onClick={this.onClick}>Clear</button>)}
            </div>
        );
    }
}

export default Search

