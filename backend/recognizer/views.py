import requests
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect


def upload_file(request):
    counter = 1
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()

        filename = fs.save(str(counter)+'.mp3', myfile)
        counter += 1

        uploaded_file_url = fs.url(filename)

        # return render(request, 'upload.html', {
        #     'uploaded_file_url': uploaded_file_url
        # })

        # return redirect('get-song', file_url=uploaded_file_url)
        return redirect('get-by-humming', file_url=uploaded_file_url)

    return render(request, 'upload.html')


def get_by_song(request, file_url):
    data = {
        'url': 'http://73c7b7ea.ngrok.io'+file_url,  # place tunnel url before file_url
        'return': 'deezer',
        'api_token': '80af3a2f63cc041bd1661be79a63c322'
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


def get_by_humming(request, file_url):
    data = {
        'url': 'http://73c7b7ea.ngrok.io' + file_url,  # place tunnel url before file_url
        'api_token': '80af3a2f63cc041bd1661be79a63c322'
    }

    res = requests.post('https://api.audd.io/recognizeWithOffset/', data=data).json()

    return JsonResponse(
        data={
            "status": res['status'],
            "song_name": res['result']['list'][0]['title'],
            "artist_name": res['result']['list'][0]['artist'],
        }
    )