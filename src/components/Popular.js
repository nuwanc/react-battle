import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api';
import Loading from './Loading';

function SelectedLanguage(props) {
    let languages = ['All','JavaScript','Ruby','Java','CSS','Python'];

    return (
        <ul className='languages'>
                {languages.map(lang => {
                    return (
                        <li
                        style={lang === props.selectedLanguage ? { color:'#d0021b'}: null} 
                        key={lang} 
                        onClick={props.onSelect.bind(null,lang)}>
                        {lang}
                        </li>
                    )
                })}
        </ul>
    )
}

SelectedLanguage.propTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function RepoGrid(props) {
    return(
        <ul className='popular-list'>
            {props.repos.map((repo,index)=>{
                return (
                    <li className='popular-item' key={repo.name}>
                    <div className='popular-rank'>#{index + 1}</div>
                    <ul className='space-list-item'>
                        <li>
                            <img
                            className='avatar' 
                            src={repo.owner.avatar_url}
                            alt={'Avatar for '+repo.owner.login} />
                        </li>
                        <li><a href={repo.html_url}>{repo.name}</a></li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                    </li>
                )
            })}
        </ul>
    )   
}

RepoGrid.propTypes = {
    repos : PropTypes.array.isRequired,
}

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage : 'All',
            repos : null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(()=>{
            return {
                selectedLanguage : lang,
                repos : null
            }
        });
        api.fetchPopularRepos(lang).then((repos)=>{
            this.setState(()=>{
                return {
                    repos: repos
                }
            })
        })
    }

    render() {
        
        return (
            <div>
                <SelectedLanguage
                selectedLanguage={this.state.selectedLanguage}
                onSelect={this.updateLanguage}
                />
                {!this.state.repos ? <Loading/> : <RepoGrid repos={this.state.repos} />}               
            </div>
        )
    }
}

export default Popular;