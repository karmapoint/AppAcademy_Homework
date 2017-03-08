import React from 'react';
import GiphysIndex from './giphys_index';

class GiphysSearch extends React.Component {

  constructor() {
    super();
    this.state = { searchTerm: 'kitten' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchSearchGiphys('kitten');
  }

  handleChange(event) {
    this.setState({ searchTerm: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let searchTerm = this.state.searchTerm.split(' ').join('+');
    this.props.fetchSearchGiphys(searchTerm);
  }

  render() {
    let { giphys }= this.props;

    return (
    <div>
      <form className="search-bar">
        <input value={this.state.searchTerm} onChange={this.handleChange} />
        <button type="submit" onClick={this.handleSubmit}>Search Giphy</button>
      </form>
      <GiphysIndex giphys={giphys} />
    </div>
  );
  }
}

export default GiphysSearch;
