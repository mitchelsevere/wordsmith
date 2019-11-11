import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Song from './Song';

const StyledLyrics = styled.div`
    width: 100%;
    padding-bottom: 22px;
    opacity: 0;
    transition: 200ms opacity ease-in;
    &.loaded {
        opacity: 1;
    }
    .bar {
        font-size: 1.6rem;
        line-height: 1.2;
    }
    .song-content {
        background: #E8E8E5;
        background-size: cover;
        border-radius: 15px;
        padding: 22px;
        margin: 22px 22px 22px 0;
    }
    .song-thumbnail {
        width: 100%;
    }
    .song-title {
        margin: 0;
    }
    button {
        text-transform: uppercase;
        outline: 0;
        background: #949eff;
        color: #FFF;
        box-shadow: 0 3px 15px rgba(200, 200, 200, 0.5);
        width: 100%;
        border: 0;
        border-radius: 4px;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        
        &:hover, 
        &:active, 
        &:focus {
            background: #3A49E0;
        }
    }
    @media(min-width: 768px) {
        .song-thumbnail {
            width: 300px;
        }
    }
    @media(min-width:1025px) {
        > div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            flex-wrap: wrap;
            flex-shrink: 0;
        }
        button {
            width: 50%;
            margin-top: 22px;
            order: 2;
        }
        .song-content {
            height: 500px;
        }
        .lyrics {
            display: flex;
            justify-content: center;
            height: 525px;
            order: 1;
            > div {
                overflow: scroll;
            }
        }
    }
`;

class Lyrics extends React.Component {
    constructor(props) {
        super(props);

        this.state = { song: null }
        this.favoriteSong = this.favoriteSong.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.post(`/songs/${id}`, { id })
            .then(song => {
                this.setState(() => ({ song }))
            })
            .catch(err => console.error('ERROR: ', err ));
    }
    favoriteSong() {
        const favorite = {
            genius_id: this.state.song.data.id,
            title: this.state.song.data.title,
            artist: this.state.song.data.primary_artist.name,
            album: this.state.song.data.song_art_image_url
        }

        axios.post('/profile', favorite)
        .then(() => {
            if(this.state.user) {
                this.props.history.push({
                    pathname: "/profile"
                });
            } 
        })
        .catch(err => console.error('ERROR: ', err ));
    }
    render() {
        console.log('SONG', this.state.song, this.props.getUser)
        return (
            <StyledLyrics className={this.state.song && 'loaded'}>
                {
                    this.state.song && 
                    <div>
                        <button onClick={this.favoriteSong}>Favorite Song</button>
                        <div className="lyrics">
                            <Song
                                thumbnail={this.state.song.data.song_art_image_url} 
                                title={this.state.song.data.title}
                                artist={this.state.song.data.primary_artist.name} />
                            <div>
                                {this.state.song.data.lyrics.split(/\r?\n/).map((verse, idx) => {
                                    return (verse !== "") ? <p className="bar" key={idx}>{verse}</p> : <br />
                                })}
                            </div>
                        </div>
                    </div>
                }
            </StyledLyrics>
        )
    }

}

export default Lyrics;