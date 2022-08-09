from rest_framework import generics, status
from .serializers import BookSerializer, LoadBookSerializer, DeleteBookSerializer
from .models import Book
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .pagination import BookPagination
from rest_framework import filters
from .validation import validate_book, validate_image_url



class BookView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'author', 'genre']



class GetBookView(APIView):
    serializer_class = BookSerializer
    lookup_url_kwarg = 'id'

    def get(self, request):
        my_id = request.GET.get(self.lookup_url_kwarg)
        if my_id is not None:
            books = Book.objects.filter(id=my_id)
            if len(books) > 0:
                data = BookSerializer(books[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'error': {
                    'id': {
                        'Book id is not found.'
                    }
                }}, status=status.HTTP_200_OK)

        return Response({'error': {
            'id': {
                'Data is incorrect.'
            }
        }}, status=status.HTTP_200_OK)





class LoadBookView(APIView):
    serializer_class = LoadBookSerializer

    @csrf_exempt
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            info = serializer.data.get('info')
            genre = serializer.data.get('genre')
            image = serializer.data.get('image')
            author = serializer.data.get('author')

            queryset = Book.objects.filter(name=name)
            if queryset.exists():
                return Response({'error': {
                    'name': {
                        'This book already exists.'
                    }
                }}, status=status.HTTP_200_OK)
            res = validate_book(name=name, image=image, info=info, genre=genre, author=author)
            if res != 0:
                return res
            book = Book(name=name, info=info, genre=genre, image=image, author=author)
            book.save()
            return Response(BookSerializer(book).data, status=status.HTTP_200_OK)

        return Response({'error': serializer.errors}, status=status.HTTP_200_OK)


class DeleteBookView(APIView):
    serializer_class = DeleteBookSerializer

    @csrf_exempt
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')

            queryset = Book.objects.filter(name=name)
            if not queryset.exists():
                return Response({'error': {
                    'name': {
                        'This book does not exist.'
                    }
                }}, status=status.HTTP_200_OK)

            book = queryset[0]
            book.delete()
            return Response(BookSerializer(book).data, status=status.HTTP_200_OK)

        return Response({'error': serializer.errors}, status=status.HTTP_200_OK)


class ChangeBookView(APIView):
    serializer_class = LoadBookSerializer

    @csrf_exempt
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            image = serializer.data.get('image')

            queryset = Book.objects.filter(name=name)
            if not queryset.exists():
                return Response({'error': {
                    'name': {
                        'This book does not exist.'
                    }
                }}, status=status.HTTP_200_OK)
            res = validate_image_url(image)
            if res != 0:
                return res

            book = queryset[0]
            book.image = image

            book.save(
                update_fields=['image', ]
            )
            return Response(BookSerializer(book).data, status=status.HTTP_200_OK)

        return Response({'error': serializer.errors}, status=status.HTTP_200_OK)




