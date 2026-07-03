FROM rust:latest
WORKDIR /usr/src/myapp
COPY . /usr/src/myapp
RUN rustc hello.rs
CMD [ "./hello" ]
