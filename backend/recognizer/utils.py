def handle_uploaded_file(f):
    with open('../../file_storage/[filename]', 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
