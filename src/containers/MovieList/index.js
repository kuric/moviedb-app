import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { RingLoader} from 'react-spinners';
import ReactPaginate from 'react-paginate';
import MovieCard from "../../components/MovieCard";

import * as helpers from '../../helpers';

export default class MovieList extends React.Component {
    state = {
        movies: [],
        currentPage: 1,
        status: 'initial',
        loading: false,
        pageCount: 0
    };
   async componentDidMount() {
        this.setState({
            loading: true
        });
        const movies = await helpers.getTopMovies(this.state.currentPage);
        await this.setState({
            movies,
            status: 'done',
            loading: false,
            pageCount: movies.total_pages
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
                <div>
                    <Row>
                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            initialPage={0}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </Row>
                    <Row>
                        {moviesColumns}
                    </Row>

                </div>
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
    handlePageClick = async (data) => {

        let selected = data.selected + 1;
        this.setState({
            loading: true
        });
        const movies = await helpers.getTopMovies(selected);
        await this.setState({
            movies,
            status: 'done',
            loading: false,
            pageCount: movies.total_pages,
            currentPage: selected
        });
    }
}