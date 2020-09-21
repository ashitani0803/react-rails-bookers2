class BooksController < ApplicationController
    before_action :current_user, only: [:index]

    def index
        if params[:id]
            @books = Book.where(user_id: params[:id])
            @user = User.find(params[:id])
            render json: {books: @books, user: @user}
        else
            @books = Book.all
            render json: {books: @books, user: @current_user}
        end
        
    end

    def show
        @book = Book.find(params[:id])
        @user = @book.user
        render json: {book: @book, user: @user}
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
