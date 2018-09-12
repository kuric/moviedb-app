import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
export default class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        // console.log('movieCard',movie);
        let movieOverview = movie.overview.length > 200 ? movie.overview.slice(0,200)+'...' : movie.overview;
        return (
            <div className="movie-card">
                <div className="movie-card card">
                    <div className="card">
                         <img className="img-responsive image" src={movie.poster_path} alt="" />
                        <div className="card-text">
                            <div className="text">
                            <h4 className="card-title">{movie.title}</h4>
                            <h6 className="subtitle">{movie.original_title}</h6>
                            <p className="overview" >{movieOverview}</p>
                            </div>
                        </div>

                    </div>
                        <Link  to={`/${movie.id}`}>
                             <h4 className="text-center">{movie.title}</h4>
                        </Link>
                </div>
            </div>
        )
    }
}