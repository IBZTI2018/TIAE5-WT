import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../redux/offers/selectors';
import * as actions from '../../redux/offers/actions';

class SearchInput extends Component {
    render() {
        // State
        const { searchQuery } = this.props;

        // Actions
        const { setSearchQuery } = this.props;

        return (
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search for a hotel / offer / area " 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
            />
        );
    }
}

const mapSelectors = store => ({
    searchQuery: selectors.getSearchQuery(store)
});

const mapActions = {  ...actions };

export default connect(mapSelectors, mapActions)(SearchInput);