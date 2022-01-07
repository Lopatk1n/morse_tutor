from django.urls import path
from django.urls.conf import include, re_path

from .views import GetLessonAPIView, alphabet_lesson, index_view, log_in, log_out, training_view, reg, receiving_view, transmiting_view

urlpatterns = [
    path('', index_view, name='welcoming'),
    path('training/', training_view, name='training'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('alphabet_lesson/', alphabet_lesson, name='alphabet_lesson'),
    path('receiving/', receiving_view, name='receiving'),
    path('transmiting/', transmiting_view, name='transmiting'),
    path('log_out/', log_out, name='logout'),
    path('login/',log_in, name='login'),
    path('sign_up/', reg , name='sign_up'),
    re_path('social/', include('social_django.urls', namespace='social')),
    path('api/lesson/get/<int:pk>/', GetLessonAPIView.as_view(), name='get_lesson'),

]
