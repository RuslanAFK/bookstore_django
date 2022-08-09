from django.urls import path
from .views import DeleteBookView, ChangeBookView, LoadBookView, BookView, GetBookView
from .user_views import UserView, SignupView, LoginView, GetUserView

urlpatterns = [
    # Books
    path('books/', BookView.as_view()),
    path('load/', LoadBookView.as_view()),
    path('delete/', DeleteBookView.as_view()),
    path('change/', ChangeBookView.as_view()),
    path('get_book/', GetBookView.as_view()),

    # Users
    path('users/', UserView.as_view()),
    path('login/', LoginView.as_view()),
    path('signup/', SignupView.as_view()),
    path('get_user/', GetUserView.as_view()),
]
