import React, { useState } from 'react';
import PropTypes from 'prop-types'


const Search = ({showAlert, searchUsers, clearUsers}) => {
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    
    const onChange = (e) => setText(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            showAlert('Please enter something', 'light');
        } else {
            searchUsers(this.state.text);
            setText(''); 
            setShow(true);
        }
    }
    const onClick = () => {
        clearUsers();
        setShow(false);
    }
    
    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input type="text" name="text" 
                placeholder="Search profiles ...." 
                value={text} 
                onChange={onChange}
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            { show && (<button className='btn btn-light btn-block' onClick={onClick}>Clear</button>)}
        </div>
    );
    
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search

