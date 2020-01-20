from django.urls import path, include

from recognizer import views

urlpatterns = [
    path('upload_file', views.upload_file, name='upload-file'),
    path('get_song/<path:file_url>', views.get_song, name='get-song'),
]
