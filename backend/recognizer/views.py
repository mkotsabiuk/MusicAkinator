import requests
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .utils import handle_uploaded_file, get_file_name

from backend.settings import CONFIG


@csrf_exempt
def get_song(request):
    file_name = get_file_name()
    handle_uploaded_file(file_name, request.FILES['file'])

    data = {
        'url': f'{CONFIG["base_url"]}/static/{file_name}',
        'return': 'deezer',
        'api_token': CONFIG["audd.io_token"]
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
