import os
import uuid

from backend.settings import BASE_DIR, AUDDIO_KEY, TUNNEL_URL
import requests
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES['file']:
        myfile = request.FILES['file']
        fs = FileSystemStorage()

        filename = fs.save(uuid.uuid4().hex + '.mp3', myfile)
        uploaded_file_url = fs.url(filename)

        return redirect('get-by-song', file_url=uploaded_file_url)

    return render(request, 'upload.html')


def get_by_song(request, file_url):
    data = {
        'url': TUNNEL_URL + file_url,
        'return': 'deezer',
        'api_token': AUDDIO_KEY
    }

    res = requests.post('https://api.audd.io/', data=data).json()
    if os.path.exists(BASE_DIR + file_url):
        os.remove(BASE_DIR + file_url)

    return JsonResponse(
        data={
            "status": res['status'],
            "song_name": res['result']['deezer']['title'],
            "path_to_artist_image": res['result']['deezer']['artist']['picture'],
            "path_to_audio": res['result']['deezer']['preview'],
        }
    )


# We decided not to use by humming method because it works poorly :)
"""
def get_by_humming(request, file_url):
    data = {
        'url': '' + file_url,  # place tunnel url before file_url
        'api_token': '80af3a2f63cc041bd1661be79a63c322'
    }

    res = requests.post('https://api.audd.io/recognizeWithOffset/', data=data).json()

    if os.path.exists(BASE_DIR + file_url):
        os.remove(BASE_DIR+file_url)

    return JsonResponse(
        data={
            "status": res['status'],
            "song_name": res['result']['list'][0]['title'],
            "artist_name": res['result']['list'][0]['artist'],
        }
    )
"""
