FROM python:3.9

WORKDIR /app

RUN pip install torch --extra-index-url https://download.pytorch.org/whl/cpu

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app/

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
