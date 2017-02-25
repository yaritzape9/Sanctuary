class ContactsController < ApplicationController

  def new
    @contact = Contact.new(contact_params)
    render 'new'
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      redirect_to #user_path
    else
      render 'new'
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
