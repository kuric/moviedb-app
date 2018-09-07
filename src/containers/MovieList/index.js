import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { RingLoader} from 'react-spinners';
import {css} from 'react-emotion';
import ReactPaginate from 'react-paginate';
import MovieCard from "../../components/MovieCard";

import * as helpers from '../../helpers';
import SearchBox from "../../components/SearchForm";

export default class MovieList extends React.Component {
    state = {
        movies: [],
        currentPage: 1,
        status: 'initial',
        loading: false,
        pageCount: 0,
        query: null,
        genres: null
    };
   async componentDidMount() {
        this.setState({
            loading: true
        });
        const movies = await helpers.getTopMovies(this.state.currentPage);
        const genres = await helpers.getGenres();
        await this.setState({
            movies,
            status: 'done',
            loading: false,
            pageCount: movies.total_pages,
            genres:genres.genres
        });

    }
    render() {
        // console.log('render',this.state.movies);
        const {movies: topMovies, genres, status} = this.state;
        if(status === 'done') {
            // console.log('render genres', genres)
            let movies = helpers.updateMoviesList(topMovies.results);
            movies = helpers.mapMoviesList(movies, genres);
             const moviesColumns = movies ? movies.map(movie => (
                <Col key={movie.id} xs={12} sm={4} md={3} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            )) : null;
            return (
                <div>
                    <Row>
                        <SearchBox action={this.handleChange}/>
                    </Row>
                    <Row>
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            initialPage={0}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            // activeClassName={"active"}
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
                    className={override}
                    sizeUnit={"px"}
                    size={60}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            )
        }
    }
    handleChange = async (e) => {
       const query = e.target.value.replace(' ', '%2B');

       let movies;
       // console.log('query',query);
        this.setState({
            currentPage: 1
        });
       if(query) {
           movies = await helpers.searchMovies(this.state.currentPage, query);
       } else {
           movies = await helpers.getTopMovies(this.state.currentPage);
       }
        await this.setState({
            movies,
            status: 'done',
            loading: false,
            pageCount: movies.total_pages,
            query: query
        });
       // await console.log('search movies', movies);
       // await console.log('search movies query', query);
    };
    handlePageClick = async (data) => {
        // console.log('current page', selectedPage);
        let {movies, query} = this.state;

        let selectedPage = data.selected + 1;

        if(this.state.query) {
            this.setState({
                loading: true
            });
           movies = await helpers.searchMovies(selectedPage, query);
        } else {
            this.setState({
                query: '',
                loading: true
            });
             movies = await helpers.getTopMovies(selectedPage);
        }
        await this.setState({
            movies,
            status: 'done',
            loading: false,
            pageCount: movies.total_pages,
            currentPage: selectedPage,
            query : query
        });
    }
}
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;