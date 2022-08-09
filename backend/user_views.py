from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .user_serializers import UserSerializer, SignupSerializer, LoginSerializer, UserIdSerializer
from .validation import validate_user


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer




class SignupView(APIView):
    serializer_class = SignupSerializer

    @csrf_exempt
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            is_admin = serializer.data.get('is_admin')

            queryset = User.objects.filter(username=username)
            if queryset.exists():
                return Response({'error': {
                    'username': {
                        'This user already exists.'
                    }
                }}, status=status.HTTP_200_OK)
            res = validate_user(username, password)
            if res != 0:
                return res
            user = User(username=username, password=password, is_admin=is_admin)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

        return Response({'error': serializer.errors}, status=status.HTTP_200_OK)


class LoginView(APIView):
    serializer_class = LoginSerializer

    @csrf_exempt
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')

            queryset = User.objects.filter(username=username)
            if not queryset.exists():
                return Response({'error': {
                    'username': {
                        'This user does not exist.'
                    }
                }}, status=status.HTTP_200_OK)

            user = queryset[0]

            if user.password != password:
                return Response({'error': {
                    'password': {
                        'Password is not correct.'
                    }
                }}, status=status.HTTP_200_OK)

            return Response(UserIdSerializer(user).data, status=status.HTTP_200_OK)

        return Response({'error': serializer.errors}, status=status.HTTP_200_OK)


class GetUserView(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'

    def get(self, request):
        my_id = request.GET.get(self.lookup_url_kwarg)
        if my_id is not None:
            users = User.objects.filter(id=my_id)
            if len(users) > 0:
                data = UserSerializer(users[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'error': {
                'id': {
                    'User id is not found.'
                }
            }}, status=status.HTTP_200_OK)

        return Response({'error': {
            'id': {
                'Data is incorrect.'
            }
        }}, status=status.HTTP_200_OK)

