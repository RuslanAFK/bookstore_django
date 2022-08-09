from rest_framework.response import Response
from rest_framework import generics, status
import validators


def validate_book(name, image, info, genre, author):
    if len(name) < 3:
        return Response({'error': {
            'name': {
                'Minimum length is 3.'
            }
        }}, status=status.HTTP_200_OK)
    if len(author) < 3:
        return Response({'error': {
            'author': {
                'Minimum length is 3.'
            }
        }}, status=status.HTTP_200_OK)
    if len(genre) < 3:
        return Response({'error': {
            'genre': {
                'Minimum length is 3.'
            }
        }}, status=status.HTTP_200_OK)
    if name[0].upper() != name[0]:
        return Response({'error': {
            'name': {
                'It must start with capital letter.'
            }
        }}, status=status.HTTP_200_OK)
    if author[0].upper() != author[0]:
        return Response({'error': {
            'author': {
                'It must start with capital letter.'
            }
        }}, status=status.HTTP_200_OK)
    if len(info) < 100:
        return Response({'error': {
            'info': {
                'Minimum length is 100.'
            }
        }}, status=status.HTTP_200_OK)

    if not validators.url(image):
        return Response({'error': {
            'image': {
                'Provide existent url.'
            }
        }}, status=status.HTTP_200_OK)



    return 0


def validate_image_url(image: str):
    if not validators.url(image):
        return Response({'error': {
            'image': {
                'Provide existent url.'
            }
        }}, status=status.HTTP_200_OK)



    return 0


def validate_user(username, password):
    if len(password) < 10:
        return Response({'error': {
            'password': {
                'Minimum length is 10.'
            }
        }}, status=status.HTTP_200_OK)

    if len(username) < 4:
        return Response({'error': {
            'username': {
                'Minimum length is 4.'
            }
        }}, status=status.HTTP_200_OK)

    return 0