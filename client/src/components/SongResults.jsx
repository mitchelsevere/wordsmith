import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Search from './Search';
import Song from './Song';

const StyledResults = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .results {
        min-height: 100vh;
        width: 100%;
        text-align: center;
    }
    .song-thumbnail {
        width: 300px;
    }
    .song-title {
        display: block;
    }
`;
class SongResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        }
    }
    componentDidMount() {
        const searchQuery = this.props.location.state;
        console.log(searchQuery);
        axios.post('/songs', searchQuery)
            .then(data => this.setState(() => {
                const searchResults = data.data.response.hits;
                    return {
                        results: searchResults.map(result => {
                            return result;
                        })
                    }
                }
            ))
            .catch(err => console.error('Failed', err));
    }

    shouldComponentUpdate(nextProps) {
        return this.props.location.state.search !== nextProps.location.state.search 
        || this.props.location.state.search;
    }

    UNSAFE_componentWillUpdate(nextProps) {
        const searchQuery = nextProps.location.state;
        axios.post('/songs', searchQuery)
            .then(data => this.setState(() => {
                const searchResults = data.data.response.hits;
                    return {
                        results: searchResults.map(result => {
                            return result;
                        })
                    }
                }
            ))
            .catch(err => console.error('Failed', err));
    }

    render() {
        return (
            <StyledResults>
                <Search {...this.props}/>
                <div className="results">
                    {
                        this.state.results.map((song, idx) => {
                            return (
                                    <Link key={idx} to={`/songs/${song.result.id}`}>
                                        <Song 
                                            thumbnail={song.result.song_art_image_url} 
                                            title={song.result.title}
                                            artist={song.result.primary_artist.name} />
                                    </Link>
                            );
                        })
                    }
                </div>
            </StyledResults>
        );
    }
}

export default SongResults;