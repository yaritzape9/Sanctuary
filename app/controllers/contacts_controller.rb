class ContactsController < ApplicationController

  def new
    @contact = Contact.new

    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    if current_user
      @contact = Contact.new(contact_params)
      @contact.user = current_user

      if current_user.contacts.length >= 5

        respond_to do |format|
          format.html {redirect_to user_path(current_user), flash[:notice] = "You may have a maximum of 5 contacts."}
          format.js {render 'maxed'}
        end
      elsif @contact.save
        respond_to do |format|
          format.html {redirect_to user_path(current_user)}
          format.js { }
        end
      else
        respond_to do |format|
          format.html {redirect_to user_path(current_user), flash[:alert] = "Unable to save."}
          format.js {render 'error'}
        end
      end

    else
      redirect_to login_path
    end
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
