class PinsController < ApplicationController

  before_action :find_pin, only: []

  def index
    @pin = Pin.new
    pins = Pin.all
    # p @pins
    # @pins.each { |pin| p pin }

    respond_to do |format|
      format.html
      format.json {

        @pins = pins.map { |pin| pin.attributes.merge({ "score" => pin.score })}
        p @pins
        render json: @pins }

    end
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

  def upvote
    if current_user
      pin = Pin.find (vote_params[:pin_id])
      vote = Vote.new(user_id: current_user.id, pin_id: pin.id, vote_type: 'up')

      if vote.save

        @score = pin.score

        respond_to do |format|
          format.html
          format.json { render json: @count, status: :created }
          format.js
        end
      end
    end
  end

  private

  def pin_params
    params.require(:pin).permit(:latitude, :longitude, :address)
  end

  def vote_params
    params.require(:vote).permit(:pin_id)
  end

  def find_pin
    @pin = Pin.find(params[:phone_num])
  end
end
