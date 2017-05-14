import React, { Component } from 'react';
import queryString from 'query-string';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile(props) {
    let info = props.info;
    return (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired
}

function Player(props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{ textAlign: 'center' }}>{props.score}</h3>
            <Profile info={props.profile} />
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired
}

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            looser: null,
            error: null,
            loading: true
        };
    }

    componentDidMount() {
        let players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((results) => {
            if (results === null) {
                this.setState(() => {
                    return {
                        error: 'There was an error, check that both users are in github',
                        loading: false
                    };
                });
            }

            this.setState(() => {
                return {
                    winner: results[0],
                    looser: results[1],
                    error: null,
                    loading: false
                };
            });
        })
    }

    render() {
        let winner = this.state.winner;
        let looser = this.state.looser;
        let error = this.state.error;
        let loading = this.state.loading;

        if (loading === true) {
            return <Loading/>
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle' className='reset'>Reset</Link>
                </div>)
        }

        return (
            <div className='row'>
                <Player
                    label="Winner"
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label="Looser"
                    score={looser.score}
                    profile={looser.profile}
                />
            </div>
        )
    }
}

export default Results;