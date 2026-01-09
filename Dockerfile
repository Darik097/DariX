FROM python:3.12-slim

WORKDIR /app

ARG SITE_PORT   
ENV SITE_PORT=${SITE_PORT}  

RUN apt-get update && \
    apt-get install -y curl

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# FIXME: блять ебучий gunicorn не запускает flask как и в других проектах -> либо перейти на FastApi либо забить
# ENTRYPOINT ["sh", "-c"]
# CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:${SITE_PORT}", "main:asgi_app"]
CMD ["python", "-m", "main"]