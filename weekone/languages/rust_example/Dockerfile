FROM rust:latest
COPY . /usr/src/myapp/
WORKDIR /usr/src/myapp/
CMD ["sh", "-c", "rustc hello.rs -o hello && ./hello"]