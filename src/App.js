import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  filterShelf = (books, key) => {
    return books.filter((book) => book.shelf === key )
  }

  onShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      book.shelf = shelf
      this.setState({ 
        books: this.state.books.filter(b => b.id !== book.id).concat([ book ]) 
      })
    })
  }

  render() {
    const shelves = { currentlyReading: 'Currently Reading' , read: 'Read', wantToRead: 'Want to Read' };
    const books = this.state.books;
    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
               <div>
                 { Object.keys(shelves).map((shelfKey) => (
                  <BookShelf 
                    shelfTitle={shelves[shelfKey] }
                    books={this.filterShelf(books, shelfKey)}
                    key={shelfKey}
                    onShelfChange={this.onShelfChange}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                className='add-add'>
                Add a book
              </Link>
            </div>
          </div>
        )}/>


        <Route path='/search' render={({ history }) => (
          <SearchBooks
            booksOnShelf={books}
            onShelfChange={this.onShelfChange}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
