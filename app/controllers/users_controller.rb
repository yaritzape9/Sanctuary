class UsersController < ApplicationController

  before_action :find_user, only: [:show, :edit, :update, :destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      redirect_to root_path
    else
      render 'new'
    end
  end

  def show
    @contact = Contact.new()
  end

  def edit

  end

  def update
    if @user.update(user_params)
      redirect_to user_path(@user)
    else
      render 'edit'
    end
  end

  def destroy
    @user.destroy
    redirect_to root_path
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation,:alert_msg)
  end

  def find_user
    @user = User.find(params[:id])
  end

end
