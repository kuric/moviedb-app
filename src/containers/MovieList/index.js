import React from 'react';
import {Row, Col} from 'react-bootstrap';
import MovieCard from "../../components/MovieCard";

import { RingLoader} from 'react-spinners';
import * as helpers from '../../helpers';

export default class MovieList extends React.Component {
    state = {
        movies: [],
        currentPage: 1,
        status: 'initial',
        loading: false
    };
   async componentDidMount() {
        this.setState({
            loading: true
        });
        const movies = await helpers.getTopMovies(this.state.currentPage);
        await this.setState({
            movies,
            status: 'done',
            loading: false
        });

    }
    render() {
        console.log('render',this.state.movies);
        const {movies: topMovies, status} = this.state;
        if(status === 'done') {
            const movies = helpers.updateMoviesList(topMovies.results);
            const moviesColumns = movies ? movies.map(movie => (
                <Col key={movie.id} xs={12} sm={4} md={3} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            )) : null;
            return (
                <Row>
                    {moviesColumns}
                </Row>
            )
        } else {
            return (
                <RingLoader
                    className={''}
                    sizeUnit={"px"}
                    size={60}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            )
        }

    }
}