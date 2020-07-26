import React, {Component, Fragment, useState } from 'react'

const Search = ({onSearch}) => {
    const[search, setSearch] = useState('');

    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value);
    }
    return (
        <Fragment>
            <input type = "text"
                className = "form-control"
                style = {{width: "500px"}}
                placeholder = "Search"
                value = {search}
                onChange = { (e) => onInputChange(e.target.value)}
            />
        </Fragment>
    )
};
export default Search;
