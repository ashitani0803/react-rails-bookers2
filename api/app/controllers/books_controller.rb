class BooksController < ApplicationController

    def index
        if params[:id]
            @books = Book.where(user_id: params[:id])
        else
            @books = Book.all
        end
        render json: {books: @books}
    end

    def show
        @book = Book.find(params[:id])
        render json: {book: @book}
    end

    def create
        @book = Book.new(book_params)
        @book.user_id = current_user.id
        if @book.save
            render json: {book: @book, status: :created}
        else
            render json: {error: @book.errors.messages}
        end
    end

    def update
    end

    def destroy
    end

    private

    def book_params
        params.require(:book).permit(:title, :body)
    end
end
