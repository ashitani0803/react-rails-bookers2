class UsersController < ApplicationController
    before_action :current_user, only: [:signed_in]
    def index
        @users = User.all
        render json: {users: @users}
    end

    def update
        @user = User.find(params[:id])
        # プロフィール画像がアップロードされなかった場合は画像だけ更新しない
        if @user == current_user \
          && params[:image] == "[object Object]" \
          && @user.update!(name: params[:name], introduction: params[:introduction])
            render json: {user: @user}
        elsif @user == current_user \
          && @user.update!(name: params[:name], introduction: params[:introduction], image: params[:image])
            render json: {user: @user}
        else
            render json: {error: @user.errors.messages}
        end
    end

    def sign_in
        @user = User.find_by(name: sign_in_params[:name])
        if @user.authenticate(sign_in_params[:password])
            log_in(@user)
            render json: {user: @user, status: :signedIn}
        else
            render json: {error: @user.errors.messages}
        end
    end

    def sign_up
        @user = User.new(sign_up_params)
        if @user.save
            log_in(@user)
            render json: {user: @user, status: :created}
        else
            render json: {status: :signOut}
        end
    end

    def sign_out
        reset_session
        render json: {message: "Signed out successfully."}
    end

    def signed_in
        p session[:user_id]
        if @current_user
            render json: {user: @current_user, status: :signedIn}
        else
            render json: {status: :signOut}
        end
    end

    private

    def sign_in_params
        params.require(:user).permit(:name, :password)
    end

    def sign_up_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def user_update_params
        params.require(:user).permit(:name, :introduction, :avatar)
    end
end
