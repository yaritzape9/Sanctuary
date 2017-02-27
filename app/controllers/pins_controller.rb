class PinsController < ApplicationController

  before_action :find_pin, only: [:show, :edit, :update, :destroy]

  def index
    @pin = Pin.new
    @pins = Pin.all

    respond_to do |format|
      format.html
      format.json { render json: @pins }
    end
  end

  def new
    @pin = Pin.new
  end

  def create
    @pin = Pin.new(pin_params)

    if @pin.save
      redirect_to map_path
    else
      render 'new'
    end
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
