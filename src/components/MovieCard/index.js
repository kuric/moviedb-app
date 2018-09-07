import React from 'react';
import { Link } from 'react-router-dom'

export default class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        return (
            <Link  to={`/${movie.id}`}>
            <div>
                <p>{movie.title}</p>
                <p>{movie.overview}</p>
                <p>{movie.genreNames}</p>
                 {/*<img src={`${movie.poster_path}`} alt={movie.title}/>*/}
            </div>
            </Link>
        )
    }
}