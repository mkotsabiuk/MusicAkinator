import json

from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .forms import UploadFileForm
from .utils import handle_uploaded_file


@csrf_exempt
def get_song(request):
    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():
        handle_uploaded_file(request.FILES['file'])
        return JsonResponse(
            data={
                "song_name": "",
                "path_to_image": "",
                "path_to_audio": "",
            }

        )
    else:
        return JsonResponse(data={"status": "not found"})



