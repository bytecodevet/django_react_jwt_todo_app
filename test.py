import requests

user_data = {
    'username': 'serik',
    'password': '1509790384vfrC',
    'password2': '1509790384vfrC',
    'email': 'urazmaxambetov1@gmail.com',
    'first_name': 'Serik',
    'last_name': 'Urazmaxambetov'
}

response = requests.post('http://127.0.0.1/api/user/create/', user_data)
token_data = response.json()
access_token = token_data.get('access')
refresh_token = token_data.get('refresh')
print(token_data)
# data = {
#     'refresh': refresh_token
# }

# print(refresh_token)
# response = requests.post('http://127.0.0.1:1000/api/user/token/refresh/', data=data)
# print(response.json())
