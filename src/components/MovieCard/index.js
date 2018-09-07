import React from 'react';

export default class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        return (
            <div>
                <p>{movie.title}</p>
                <p>{movie.overview}</p>
                 {/*<img src={`${movie.poster_path}`} alt={movie.title}/>*/}
            </div>
        )
    }
}