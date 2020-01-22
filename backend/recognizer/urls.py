from django.urls import path, include

from recognizer import views

urlpatterns = [
    path('upload_file', views.upload_file, name='upload-file'),
    path('get_by_song/<path:file_url>', views.get_by_song, name='get-by-song'),
    path('get_by_humming/<path:file_url>', views.get_by_humming, name='get-by-humming'),
]
