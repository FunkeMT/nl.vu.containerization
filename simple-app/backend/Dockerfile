# Python Flask API
FROM python:3.7-alpine
# set env
ENV FLASK_APP app
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
# exposing port 5000 on container
EXPOSE 5000
# setting working dir inside container
WORKDIR /home/flaskapp
# copy files
COPY $PWD/flask-api /home/flaskapp
# install req
RUN pip3 install -r requirements.txt
# exec
CMD ["gunicorn", "--bind", "0.0.0.0:5000","wsgi:app"]