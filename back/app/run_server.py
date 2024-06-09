import subprocess

def start_server():
    try:
        subprocess.run(["uvicorn", "app.main:app", "--reload"])
    except KeyboardInterrupt:
        print("Server stopped by user")

if __name__ == "__main__":
    start_server()