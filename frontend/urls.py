from django.urls import path, include
from .views import index


urlpatterns = [
    path('', index), #---root
    path('login/', index), #---1
    path('signup/', index), #---1

    path('books/', index), #---2
    path('upload/', index), #---2
    path('delete/', index), #---2
    path('change/', index), #---2
    path('user/', index), #---1

    path('book/', index), #---3
]