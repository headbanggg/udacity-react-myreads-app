import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchPage from './SearchPage'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    //get booklist from API
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  getBooksAccordingToCategory(title){
    //return books according to specified category
    return this.state.books.filter((book) =>
      book.shelf === title
    )
  };
  onBookListChanged=(book,shelf)=>{
    //update book shelf with api
    BooksAPI.update(book,shelf).then(()=>{
      book.shelf = shelf;
      this.setState(() =>({books:this.state.books.filter(b=>b.id !== book.id).concat(book)}))
    })
  }

  render() {
    return (
      <div className='app'>
      <Route exact path='/' render={()=>(
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>
          <div className='list-book'>
            <div className='list-book-content'>
                <BookList books={this.getBooksAccordingToCategory("currentlyReading")} title="Currently Reading" onBookListChanged={this.onBookListChanged}/>
                <BookList books={this.getBooksAccordingToCategory("wantToRead")} title="Want to Read" onBookListChanged={this.onBookListChanged}/>
                <BookList books={this.getBooksAccordingToCategory("read")} title="Read" onBookListChanged={this.onBookListChanged}/>
            </div>
            <div className="open-search">
              
              <Link to="/search" className='button'> <button className="open-search">Add a book</button></Link>
            </div>
          </div>
          </div>
        )}/>
        <Route path='/search' render={()=>(
          <SearchPage books={this.state.books} onBookListChanged={this.onBookListChanged}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
