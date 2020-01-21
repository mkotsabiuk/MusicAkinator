import requests
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from backend.settings import CONFIG


@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES['file']:
        file = request.FILES['file']
        fs = FileSystemStorage()

        filename = fs.save('', file)

        uploaded_file_url = fs.url(filename)

        return redirect('get-song', file_url=uploaded_file_url)

    else:
        return JsonResponse(
            data={
                "status": 'Upload error',
            }
        )


def get_song(request, file_url):
    data = {
        'url': CONFIG['base_url'] + file_url,
        'return': 'deezer',
        'api_token': CONFIG['audd.io_token']
    }

    res = requests.post('https://api.audd.io/', data=data).json()

    return JsonResponse(
        data={
            "status": res['status'],
            "song_name": res['result']['deezer']['title'],
            "path_to_artist_image": res['result']['deezer']['artist']['picture'],
            "path_to_audio": res['result']['deezer']['preview'],
        }
    )
