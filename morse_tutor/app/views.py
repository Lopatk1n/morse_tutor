from django.http.response import  JsonResponse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LessonSerializer
from .models import CustomUser, Lesson
import json

def index_view(request):
    return render(request, 'welcoming.html')

def training_view(request):
    return render(request, 'training.html')

def alphabet_lesson(request):
    return render(request,'alphabet_lesson.html')

def receiving_view(request):
    return render(request, 'receiving.html')

def transmiting_view(request):
    return render(request, 'transmiting.html')

def log_out(request):
    logout(request)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

def log_in(request):
    if request.method == 'POST':
        request_body = json.loads(request.body.decode('utf-8'))
        username = request_body['username']
        password = request_body['password']
        try:
            user = authenticate(request, username=username, password=password)
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        except Exception:
            data = {
                'detail':'Wrong username or password!'
            }
            return JsonResponse(data, status = 401)
        
def reg(request):
    if request.method == 'POST':
        request_body = json.loads(request.body.decode('utf-8'))
        username = request_body['username']
        email = request_body['email']
        password = request_body['password']
        if all((username, password, email)):
            try:
                user = CustomUser.objects.create(username=username, password=make_password(password), email=email)
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                return redirect('training')
            except Exception as e:
                data = {
                'detail':f'{e}'
                }
                return JsonResponse(data, status = 406)
        else:
            data = {
                'detail':'You have to fill all fields'
                }
            return JsonResponse(data, status = 406)

class GetLessonAPIView(APIView):

    def get(self, request, pk):
        lesson = Lesson.objects.get(id=pk)
        serializer = LessonSerializer(lesson, many=False)
        return Response(serializer.data)