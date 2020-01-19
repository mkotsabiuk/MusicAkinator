import time


def handle_uploaded_file(file_name, file):
    with open(f'../file_storage/{file_name}', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)


def get_file_name() -> str:
    return "".join(str(time.time()).split('.')) + ".mp3"
