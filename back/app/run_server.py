import subprocess

def start_server():
    subprocess.run(["uvicorn", "app.main:app", "--reload"])

if __name__ == "__main__":
    start_server()