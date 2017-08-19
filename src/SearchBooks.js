import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Books from './Books';

class SearchBooks extends Component {
  state = {
    books: [],
    query: '',
  }

  updateQuery = (query) => {

    const newQuery = query.trim();
    this.setState({ query: newQuery });

    if (newQuery) {      
      BooksAPI.search(newQuery, 20).then((searchResults) => {
        this.setState({ 
          books: searchResults.map(searchResult => {
            searchResult.shelf = 'none'
            this.props.booksOnShelf.forEach(book => {
              if (book.id === searchResult.id) searchResult.shelf = book.shelf
            })
            return searchResult
          }),
        })
      })
    } else {
      this.setState((state) => ({
        books: []
      }))
    }
  }





  onShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      book.shelf = shelf
      this.setState({ 
        books: this.state.books.filter(b => b.id !== book.id) 
      })
    })
  }

  render() {
    const books = this.state.books
    let content = ''
    console.log(this.props)

    if (books.length > 0 && !(books === null )) {
      content = <Books 
        books={books}
        onShelfChange={this.onShelfChange}
      />
    } else {
      content = <p>No books found</p>
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link
            to='/'
            className='close-search'>
            Close
          </Link>

          <div className="search-books-input-wrapper">
             <input 
              type="text"
              placeholder="Search by title or author"
              value={this.state.query} 
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {content}
        </div>
      </div>
    )
  }
}

export default SearchBooks
