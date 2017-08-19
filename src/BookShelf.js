import React, { Component } from 'react';
import Books from './Books'

class BookShelf extends Component {

  render() {
    const title = this.props.shelfTitle
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <Books
            books={books}
            onShelfChange={this.props.onShelfChange}
          />
        </div>
      </div>
    )
  }
}

export default BookShelf

   


