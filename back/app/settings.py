from datetime import timedelta

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
SECRET_KEY = "@!#$!#$^@%$&1KOI#$%^JAS!#@$!@#RDAFSDFADFA"
TOKEN_EXPIRATION = timedelta(hours=1)
REFRESH_TOKEN_EXPIRE_DAYS = 30
ALGORITHM = "HS256"
