import time

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def main(request):
    return HttpResponse(content=time.asctime(time.gmtime()))
