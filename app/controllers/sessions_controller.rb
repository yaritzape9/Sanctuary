class SessionsController < ApplicationController

  def new
    render 'new'
  end

  def create
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      login(@user)
      redirect_to "/"
    else
      @errors = "Not able to create that pin"
      render :new
    end
  end

  def delete
    logout

    redirect_to root_path
  end

end
