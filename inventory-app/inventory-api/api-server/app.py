#!flask/bin/python
from flask import Flask, request, jsonify
from persistent import get_books, add_book, edit_book, remove_book

app = Flask(__name__)



@app.route('/')
def index():
    return "My Inventory App v2", 200



@app.route('/inventory/books', methods=['GET'])
def read_books():
    '''
        READ BOOKS
        Function used to get the inventory.
        :return: Json format of either books result or error message
    '''

    try:
        books = get_books()
        return jsonify({'books': books})
    except:
        return jsonify({'error': 'error fetching books'}), 500



@app.route('/inventory/book/create', methods=['POST'])
def create_book():
    '''
        CREATE BOOK
        Function used to insert a book into our inventory.
        :return: Json format of either success or failure response.
    '''

    book = request.get_json()
    author, title, quantity = book['author'], book['title'], book['quantity']

    try:
        add_book(title, author, quantity)
        books = get_books()
        return jsonify({'books': books}), 200
    except:
        return jsonify({'Response': 'Unable to insert into DB'}), 500


@app.route('/inventory/book/update', methods=['POST'])
def update_book():
    '''
        UPDATE BOOK
        Function used to edit a book into our inventory.
        :return: Json format of either success or failure response.
    '''

    book = request.get_json()
    book_id, author, title, quantity = book['book_id'], book['author'], book['title'], book['quantity']

    try:
        edit_book(book_id, title, author, quantity)
        books = get_books()
        return jsonify({'books': books}), 200
    except:
        return jsonify({'Response': 'Unable to update DB'}), 500


@app.route('/inventory/book/delete/<bookId>', methods=['GET'])
def delete_book(bookId):
    '''
        DELETE BOOK
        Function used to delete a book into our inventory.
        :return: Json format of either success or failure response.
    '''

    try:
        remove_book(bookId)
        books = get_books()
        return jsonify({'books': books}), 200
    except:
        return jsonify({'Response': 'Unable to delete from DB'}), 500



if __name__ == '__main__':
    app.run(debug=True)
