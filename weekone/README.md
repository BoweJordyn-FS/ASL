# Week One: Docker Language Examples

How to containerize a simple "Hello ASL!" script in several different programming languages using Docker.

## What the Dockerfile Does

The Dockerfile only does two things:

1. Copies the current directory (`.`) into a new directory inside the container, mounted at `/usr/src/myapp`.
2. Uses the `CMD` directive to tell Docker which command to run when the container starts.

## Repeating the Process for Other Languages

For each language I just repeat the same steps:

1. Create a new directory (e.g. `golang_example`, `python_example`, `node_example`, `php_example`, `ruby_example`, `rust_example`).
2. Add a `Dockerfile` that copies the project files into `/usr/src/myapp` and sets the `CMD` needed to run/build the script in that language.
3. Add a small "Hello ASL!" script (plus the current date/time) written in that language.

## Building and Running

From inside any example directory, build and run the image with Docker. For example, using the Rust example:

```bash
docker build -t rust_image .
docker run -it --name rust_image rust_image

```
