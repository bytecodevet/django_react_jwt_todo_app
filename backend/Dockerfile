FROM python:3.11

COPY . /home
WORKDIR /home

RUN pip install -r requirements.txt

EXPOSE 1000

# Wait PostgreSQL DBMS
CMD python manage.py migrate && gunicorn backend.wsgi --bind 0.0.0.0:1000