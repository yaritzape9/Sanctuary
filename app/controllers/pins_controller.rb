class PinsController < ApplicationController

  before_action :find_user, only: [:show, :edit, :update, :destroy]

  def index
    @pins = Pin.all
    #pins index may be the map view?
  end

  def new
    #won't have an explicit new view I think?
  end

  def create
    @pin = Pin.new(pin_params)

    if @pin.save
      redirect_to #pin_path
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @pin.update(pin_params)
      redirect_to #pin_path
    else
      render 'edit'
    end
  end

  private

  def pin_users
    params.require(:pin).permit(:latitude, :longitude)
  end

  def find_pin
    @pin = Pin.find(params[:phone_num])
  end


end
