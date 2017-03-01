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
    if current_user
      @pin = Pin.new(pin_params)

      if @pin.save

        respond_to do |format|
          format.html
          format.json { render json: @pin, status: :created }
          format.js
        end
      else
        flash[:unable] = "We were unable to save the report. Please try again later."
        redirect_to map_path
      end

    else
      flash[:login] = "You need to register or log in."
      redirect_to login_path
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:latitude, :longitude, :address)
  end

  def find_pin
    @pin = Pin.find(params[:phone_num])
  end
end
