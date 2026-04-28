import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import get_db, Base

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_schedules.db"

engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

SAMPLE_SCHEDULE = {
    "title": "테스트 스케줄",
    "description": "테스트 설명",
    "start_time": "2024-06-01T10:00:00",
    "end_time": "2024-06-01T11:00:00",
    "is_completed": False,
}


@pytest.fixture(autouse=True)
def clear_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


def test_create_schedule():
    response = client.post("/api/schedules/", json=SAMPLE_SCHEDULE)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == SAMPLE_SCHEDULE["title"]
    assert "id" in data


def test_get_schedules_empty():
    response = client.get("/api/schedules/")
    assert response.status_code == 200
    assert response.json() == []


def test_get_schedules():
    client.post("/api/schedules/", json=SAMPLE_SCHEDULE)
    response = client.get("/api/schedules/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_schedule_by_id():
    create_response = client.post("/api/schedules/", json=SAMPLE_SCHEDULE)
    schedule_id = create_response.json()["id"]

    response = client.get(f"/api/schedules/{schedule_id}")
    assert response.status_code == 200
    assert response.json()["id"] == schedule_id


def test_get_nonexistent_schedule():
    response = client.get("/api/schedules/99999")
    assert response.status_code == 404


def test_update_schedule():
    create_response = client.post("/api/schedules/", json=SAMPLE_SCHEDULE)
    schedule_id = create_response.json()["id"]

    update_data = {"title": "수정된 제목", "is_completed": True}
    response = client.put(f"/api/schedules/{schedule_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["title"] == "수정된 제목"
    assert response.json()["is_completed"] is True


def test_update_nonexistent_schedule():
    response = client.put("/api/schedules/99999", json={"title": "없는 스케줄"})
    assert response.status_code == 404


def test_delete_schedule():
    create_response = client.post("/api/schedules/", json=SAMPLE_SCHEDULE)
    schedule_id = create_response.json()["id"]

    response = client.delete(f"/api/schedules/{schedule_id}")
    assert response.status_code == 204

    get_response = client.get(f"/api/schedules/{schedule_id}")
    assert get_response.status_code == 404


def test_delete_nonexistent_schedule():
    response = client.delete("/api/schedules/99999")
    assert response.status_code == 404
