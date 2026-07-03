FROM golang:latest
COPY . /usr/src/myapp/
WORKDIR /usr/src/myapp/
RUN go build -o myapp hello.go
CMD ["./myapp"]