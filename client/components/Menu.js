import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories } from '../store';

const mapStateToProps = state => {
  const { products } = state.product;
  const { categories } = state.category;

  return {
    products,
    categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts),
    getCategories: () => dispatch(fetchCategories),
  };
};

class Menu extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts } = this.props;
    getCategories();
    getProducts();
  }

  render() {
    console.log(this.props);
    return <div>Hey</div>;
  }
}

// class Menu extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       categories: [],
//       products: [],
//       filterCategories: [],
//       searchTerm: '',
//     };
//   }

//   componentDidMount() {
//     axios
//       .get('/api/products')
//       .then(res => res.data)
//       .then(products => this.setState({ products }));

//     axios
//       .get('/api/categories')
//       .then(res => res.data)
//       .then(categories => this.setState({ categories }));
//   }

//   selectFilter = ({ target }) => {
//     const { filterCategories } = this.state;

//     if (filterCategories.includes(target.value)) {
//       filterCategories.filter(id => id !== target.value);
//     } else {
//       filterCategories.push(target.value);
//     }

//     this.setState({ filterCategories });
//   };

//   filterProducts = evt => {
//     const { filterCategories } = this.state;

//     evt.preventDefault();
//     this.setState({ products: [] });

//     axios
//       .get('/api/products')
//       .then(res => res.data)
//       .then(allProducts =>
//         allProducts.filter(prod => filterCategories.includes(`${prod.categoryId}`)),
//       )
//       .then(products => this.setState({ products }));
//   };

//   clearFilter = () => {
//     axios
//       .get('/api/products')
//       .then(res => res.data)
//       .then(products => this.setState({ products }));

//     this.setState({ filterCategories: [] });
//   };

//   enterSearch = ({ target }) => {
//     this.setState({ searchTerm: target.value });
//   };

//   searchProducts = evt => {
//     const { searchTerm } = this.state;
//     evt.preventDefault();
//     axios
//       .get('/api/products')
//       .then(res => res.data)
//       .then(allProducts =>
//         allProducts.filter(product =>
//           product.title.toLowerCase().includes(searchTerm.toLowerCase()),
//         ),
//       )
//       .then(products => this.setState({ products }));
//   };

//   clearSearch = () => {
//     axios
//       .get('/api/products')
//       .then(res => res.data)
//       .then(products => this.setState({ products }));

//     this.setState({ searchTerm: '' });
//   };

//   render() {
//     const { searchTerm, categories, products } = this.state;
//     return (
//       <div className="menu-page">
//         <div className="menu-filter">
//           <form onSubmit={this.searchProducts}>
//             <label htmlFor="searchItems">
//               <h4>Search Products:</h4>
//             </label>
//             <input
//               type="search"
//               name="searchItems"
//               value={searchTerm}
//               onChange={this.enterSearch}
//             />
//             <button type="submit">Search</button>
//             <button type="submit" onClick={this.clearSearch}>
//               Clear Search
//             </button>
//           </form>
//           <h4>Filter by Category:</h4>
//           <form onSubmit={this.filterProducts}>
//             {categories.map(cat => {
//               return (
//                 <div key={cat.id}>
//                   <label htmlFor="filterCategories">{cat.name}</label>
//                   <input
//                     type="checkbox"
//                     name="filterCategories"
//                     value={cat.id}
//                     onChange={this.selectFilter}
//                   />
//                 </div>
//               );
//             })}
//             <button type="submit">Apply Filter</button>
//             <button type="submit" onClick={this.clearFilter}>
//               Clear Filter
//             </button>
//           </form>
//         </div>
//         <div className="menu-list">
//           {products.map(prod => {
//             return (
//               <div key={prod.id} className="menu-item">
//                 <ul>
//                   <li>Placeholder for image</li>
//                   <Link to={`/menu/${prod.id}`}>
//                     <li>{prod.title}</li>
//                   </Link>
//                   <li>{prod.description}</li>
//                   <li>{prod.price}</li>
//                 </ul>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
