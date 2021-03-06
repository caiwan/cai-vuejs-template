FROM python:3.4-alpine
RUN apk update && apk add bash
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
VOLUME /app
# EXPOSE 5000/tcp
CMD ["/app/wait-for-it.sh", "-t", "120", "mongo:27017", "--", "python", "manage.py", "runserver"]
# CMD ["/app/wait-for-it.sh", "-t", "120", "mongo:27017", "--", "python", "app/main.py"]
