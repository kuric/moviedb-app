import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { RingLoader} from 'react-spinners';
import {css} from 'react-emotion';
import ReactPaginate from 'react-paginate';
import MovieCard from "../../components/MovieCard";
import {connect} from 'react-redux';
import * as movieActions from '../../actions';
import * as helpers from '../../helpers';
import SearchBox from "../../components/SearchForm";

class MovieList extends React.Component {
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
        const movies = await this.props.getTopMovies(this.state.currentPage);
        const genres = await this.props.getGenres();
        await this.setState({
            movies: movies.response,
            status: 'done',
            loading: false,
            pageCount: movies.response.total_pages,
            genres: genres.response
        });

    }
    render() {
        // console.log('render',this.state.movies);
        const {movies: topMovies, genres, status} = this.state;
        if(status === 'done') {
            // console.log('render genres', genres)
            // console.log('render',this.state.movies);
            let movies = helpers.updateMoviesList(this.state.movies.results);
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

        this.setState({
            currentPage: 1
        });
        // console.log('MovieList change query',query);
        // console.log('MovieList change page', this.state.currentPage);
       if(query) {
           movies = await this.props.searchMovies(this.state.currentPage, query);
       } else {
           movies = await this.props.getTopMovies(this.state.currentPage);
       }
        await this.setState({
            movies: movies.response,
            status: 'done',
            loading: false,
            pageCount: movies.response.total_pages,
            query: query
        });
    };
    handlePageClick = async (data) => {

        let {movies, query} = this.state;

        let selectedPage = data.selected + 1;

        if(this.state.query) {
            this.setState({
                loading: true
            });
            // console.log('MovieList click query',query);
           movies = await this.props.searchMovies(selectedPage, query);

        } else {
            this.setState({
                query: '',
                loading: true
            });
            // console.log('MovieList click page', this.state.currentPage);
            // console.log('pageclick page', selectedPage );
             movies = await this.props.getTopMovies(selectedPage);
        }
        await console.log('pageclick', movies.response);
        await this.setState({
            movies: movies.response,
            status: 'done',
            loading: false,
            pageCount: movies.response.total_pages,
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

export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
        topMovies: state.movieBrowser.topMovies,
        genres: state.movieBrowser.genres,
        searchedMovies: state.movieBrowser.searchMovies
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(MovieList);