FROM python:latest
RUN apt-get update && apt-get install git curl nano python3-pip -y && /usr/local/bin/python -m pip install --upgrade pip
# RUN pip3 install flask_cors pandas flask xlrd lxml pymongo redis requests
COPY ./ /
RUN pip3 install  flask_cors flask xlrd lxml redis requests --no-cache-dir
EXPOSE 5001
# CMD python3 api.py

