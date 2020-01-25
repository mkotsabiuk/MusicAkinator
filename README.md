# MusicAkinator
Test task for int20h hackathon

## Requirements

[Tasks](https://mcusercontent.com/a90be75a5d6a2bb92a394e975/files/04041863-5003-485e-bcb9-580489f0b8ba/Test_task_web.pdf)

[Google form to fill out](https://facebook.us7.list-manage.com/track/click?u=a90be75a5d6a2bb92a394e975&id=99916849c2&e=e27d4d6a92)

## How to RUN backend local?

``` 
$ ssh -R 80:localhost:8000 ssh.localhost.run

```

```
vlad@pk:~$ ssh -R 80:localhost:8000 ssh.localhost.run
Connect to http://vlad-gj65.localhost.run or https://vlad-gj65.localhost.run

```

Get second url: 
```
https://vlad-gj65.localhost.run
```
and put in backend/backend/settings.py instead HERE

```python
TUNNEL_URL = 'HERE'
```
```
$ python3 manage.py runserver
```
