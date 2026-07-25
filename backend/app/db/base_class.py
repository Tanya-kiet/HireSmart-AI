from typing import Any
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base Declarative class for SQLAlchemy 2.0 models.
    """
    id: Any
