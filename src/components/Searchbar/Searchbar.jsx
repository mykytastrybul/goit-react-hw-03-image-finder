import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSearch }) {
    const search = e => {
        e.preventDefault();
        onSearch(e.target.elements.input.value);
        e.target.elements.input.value = '';
    };

    return (
        <header className={s.searchbar} >
            <form className={s.form} onSubmit={search}>
                <button type="submit" className={s.button}>
                    <span className={s.label}>Search</span>
                </button>

                <input
                    name="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    className={s.input}
                />
            </form>
        </header>
    )
}

Searchbar.protoTypes = {
    onSubmit: PropTypes.func.isRequired,
}
