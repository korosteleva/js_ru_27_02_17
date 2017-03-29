import React, {Component, PropTypes} from 'react'
import Loader from '../Loader'
import {connect} from 'react-redux'
import { Route, Link } from 'react-router-dom';
import { loadComments, renderComments } from '../../AC'
import { commentsPageSelector } from '../../selectors/index';
import './style.css'

class CommentsPage extends Component {
    static propTypes = {
        //не нужно столько всего в компоненте, можешь часть расчитать в mapStateToProps
        comments: PropTypes.array,
        loading: PropTypes.bool,
        loadedPages: PropTypes.array,
        page: PropTypes.number.isRequired,
        totalCount: PropTypes.number,
        loadedCount: PropTypes.number,
        limit: PropTypes.number,
        path: PropTypes.string
    };

    static defaultProps = {
        page: 1
    };

    componentWillMount() {
        const { loading, loadComments, page } = this.props;
        if (!loading) {
            loadComments(page);
        }
    }

    componentWillReceiveProps(newProps) {
        const { loadedPages, loadComments, renderComments, page, totalCount, loadedCount } = this.props;
        if (
            !newProps.loading &&
            !loadedPages.includes(newProps.page) &&
            totalCount !== loadedCount
            && totalCount !== 0
        ) {
            loadComments(newProps.page);
        } else if (page !== newProps.page && loadedPages.includes(newProps.page)) {
            renderComments(newProps.page);
        }
    }

    render() {
        const { loading } = this.props;
        if (loading) {
            return <Loader />;
        }

        return (
            <div>
                <h1>Comments</h1>
                {this.renderComments()}
                <hr />
                {this.renderPagination()}
            </div>
        )
    }

    renderComments() {
        const { comments } = this.props;

        return comments.map(comment => {
            return (
                <div key={`comment${comment.id}`}>
                    <h3>#{comment.id} {comment.user}</h3>
                    <p>{comment.text}</p>
                </div>
            );
        });
    }

    renderPagination() {
        const { page, limit, totalCount, path } = this.props;
        if (!totalCount) {
            return;
        }
        const totalPages = Math.ceil(totalCount / limit);
        const pageArray = Array.apply(null, Array(totalPages)).map((x, i)=> i + 1);

        return pageArray.map(currentPage => {
            const className = currentPage === page ? 'active' : '';
            return (
                <Link
                    key={`page${currentPage}`}
                    to={path.replace(':page', currentPage)}
                    className={`pagination ${className}`}>
                    {currentPage}
                </Link>
            );
        });
    }
}

function mapStateToProps(state, {match}) {
    const currentPage = match.params.page || 1;

    return {
        comments: commentsPageSelector(state),
        loading: state.commentsPage.loading,
        loadedPages: state.commentsPage.loadedPages,
        page: parseInt(currentPage, 10),
        totalCount: state.commentsPage.totalCount,
        loadedCount: state.commentsPage.loadedCount,
        limit: state.commentsPage.limit,
        path: match.path
    }

}

export default connect(mapStateToProps, { loadComments, renderComments })(CommentsPage)
