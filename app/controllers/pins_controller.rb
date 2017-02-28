class PinsController < ApplicationController

  before_action :find_pin, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, :except => [:show, :index]

  def index
    @pin = Pin.new
    @pins = Pin.all

    # gon.my_session_variable = session[:user_id]

    respond_to do |format|
      format.html
      format.json { render json: @pins }
    end
  end

  def new
    @pin = Pin.new
  end

  def create
    if current_user
      @pin = Pin.new(pin_params)
      flash[:error] = "Unable to save pin." if @pin.save.false?
    end
    redirect_to map_path
  end

  def update
    if @pin.update(pin_params)
      redirect_to #pin_path
    else
      render 'edit'
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:latitude, :longitude)
  end

  def find_pin
    @pin = Pin.find(params[:phone_num])
  end


end
