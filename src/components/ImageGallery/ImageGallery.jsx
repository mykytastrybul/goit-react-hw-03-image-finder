import { Component } from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import getImages from '../../services/imgApi';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        inputValue: PropTypes.string.isRequired,
    }

    state = {
        images: null,
        page: 1,
        status: 'idle'
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.inputValue === '') {
            return;
        }

        if (prevProps.inputValue !== this.props.inputValue) {
            this.setState({ page: 1, status: 'pending' });
            this.fetchLoad();
        }

        if (prevState.page !== this.state.page) {
            this.fetchLoadMore();
        }
    }

    fetchLoad = () => {
        const { page } = this.state;
        const { inputValue } = this.props;

        getImages(inputValue, page)
            .then(response =>
                this.setState({
                    images: response.hits,
                    status: 'resolve'
                })
            )
            .catch(error => this.setState({ status: 'rejected' }));
    };

    fetchLoadMore = () => {
        const { page } = this.state;
        const { inputValue } = this.props;

        getImages(inputValue, page)
            .then(response =>
                this.setState(prevState => ({
                    images: [...prevState.images, ...response.hits],
                    status: 'resolve'
                }))
            )
            .catch(error => this.setState({ status: 'rejected' }));
    };

    loadMoreBtn = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }));
    };

    render() {
        const { images, status } = this.state;

        if (status === 'pending') {
            return <Loader />;
        }

        if (status === 'resolve') {
            return (
                <>
                    <ul className={s.gallery} >
                        {images.map(({ id, largeImageURL, tags }) => <ImageGalleryItem key={id} url={largeImageURL} tags={tags} onClick={this.props.onClick} />)}
                    </ul>
                    {this.state.images.length !== 0 ? <Button onClick={this.loadMoreBtn} /> : alert('No results')}
                </>
            )
        }
    }

}