class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  #ログイン済みのuserのみアクセスを許可します
  before_action :authenticate_user!

  #deviseで利用できるパラメータの設定
  before_action :configure_permitted_parameters, if: :devise_controller?  

  protected

  #サインアップ時nameも要求します
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end  

end
