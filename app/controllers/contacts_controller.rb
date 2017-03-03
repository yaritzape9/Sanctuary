class ContactsController < ApplicationController

  def new
    @contact = Contact.new()

    render 'new'
  end

  def create
    @contact = Contact.new(contact_params)
    @contact.user = current_user
    @user = current_user.id

    if @contact.user.contacts.length > 5
      redirect_to user_path(@user)
      flash[:alert] = "You are allowed 5 contacts."
    elsif @contact.save
        redirect_to user_path(@contact.user)
    else
        flash[:alert] = "Unable to save."
    end
  end

  def edit
  end

  def update
    if @contact.update(contact_params)
      redirect_to #user_path
    else
      render 'edit'
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:nickname, :phone_num)
  end

  def find_contact
    @contact = Contact.find(params[:phone_num])
  end

end
