import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            products: [],
            filterCategories: [],
            searchTerm: ''
        }
    }

    componentDidMount() {

        axios.get('/api/products')
            .then(res => res.data)
            .then(products => this.setState({ products }));

        axios.get('/api/categories')
            .then(res => res.data)
            .then(categories => this.setState({ categories }))
    }

    selectFilter = ({ target }) => {

        if (this.state.filterCategories.includes(target.value)) {
            this.state.filterCategories.filter(id => id !== target.value)
        } else {
            this.state.filterCategories.push(target.value)
        }

        this.setState({ filterCategories: this.state.filterCategories })
    }

    filterProducts = (evt) => {
        evt.preventDefault();
        axios.get(`/api/categories/${this.state.filterCategories}`)
            .then(res => res.data)
            .then(products => this.setState({ products }))
    }

    clearFilter = () => {
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => this.setState({ products }));

        this.setState({ filterCategories: [] })
    }

    enterSearch = ({ target }) => {
        this.setState({ searchTerm: target.value })
    }

    searchProducts = (evt) => {
        evt.preventDefault();
        axios.get('/api/products')
            .then(res => res.data)
            .then(allProducts => allProducts.filter(product => product.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())))
            .then(products => this.setState({ products }))

    }

    clearSearch = () => {

        axios.get('/api/products')
            .then(res => res.data)
            .then(products => this.setState({ products }));

        this.setState({ searchTerm: '' })
    }

    render() {
        console.log(this.state)
        return (
            <div className="menu-page">
                <div className="menu-filter">
                    <form onSubmit={this.searchProducts}>
                        <label htmlFor="searchItems">Search:</label>
                        <input type="search" name="searchItems" value={this.state.searchTerm} onChange={this.enterSearch} />
                        <button type="submit">Search</button>
                        <button type="reset" onClick={this.clearSearch}>Clear Search</button>
                    </form>
                    <form onSubmit={this.filterProducts}>
                        {this.state.categories.map(cat => {
                            return (
                                <div key={cat.id}>
                                    <label htmlFor="filterCategories">{cat.name}</label>
                                    <input type="checkbox" name="filterCategories" value={cat.id} onChange={this.selectFilter} />
                                </div>
                            )
                        })}
                        <button type="submit">Apply Filter</button>
                        <button type="reset" onClick={this.clearFilter}>Clear Filter</button>
                    </form>
                </div>
                <div className="menu-list">
                    {this.state.products.map(prod => {
                        return (
                            <div key={prod.id} className="menu-item">
                                <ul>
                                    <li>Placeholder for image</li>
                                    <Link to={`/menu/${prod.id}`}><li>{prod.title}</li></Link>
                                    <li>{prod.description}</li>
                                    <li>{prod.price}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Menu;
