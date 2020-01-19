import requests
from django.http import JsonResponse

from .config import config
from django.views.decorators.csrf import csrf_exempt

from .forms import UploadFileForm
from .utils import handle_uploaded_file


@csrf_exempt
def get_song(request):
    form = UploadFileForm(request.POST, request.FILES)

    file_name = ''

    handle_uploaded_file(file_name, request.FILES['file'])

    data = {
        'url': 'https://vlad-bohp.localhost.run/static/a.mp3',
        'return': 'deezer',
        'api_token': config["audd.io_token"]
    }
    result = requests.post('https://api.audd.io/', data=data).json()

    return JsonResponse(
        data={
            "status": result['status'],
            "song_name": result['result']['deezer']['title'],
            "path_to_artist_image": result['result']['deezer']['artist']['picture'],
            "path_to_audio": result['result']['deezer']['preview'],
        }

    )
