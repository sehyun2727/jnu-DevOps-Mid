# DevOps 파이프라인 프로젝트 - Claude 작업 프롬프트

## 프로젝트 개요
- **프로젝트명**: 파이썬 기반 웹 스케쥴 관리 서비스
- **주제**: 간단한 소프트웨어에 대한 DevOps 파이프라인 구축
- **목표**: 풀 스택 CI/CD 파이프라인 자동 배포 환경 구성

## 기술 스택

### Backend
- **Framework**: FastAPI (Python)
- **Runtime**: Python 3.9+

### Frontend
- **Framework**: React

### DevOps & Infrastructure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Deployment**: Render
- **Version Control**: Git/GitHub

## 소프트웨어 기능

### 핵심 기능
1. 스케쥴 생성 (CREATE)
2. 스케쥴 조회 (READ)
3. 스케쥴 수정 (UPDATE)
4. 스케쥴 삭제 (DELETE)
5. 스케쥴 상태 관리

### API Endpoints
- `GET /api/schedules` - 모든 스케쥴 조회
- `POST /api/schedules` - 새 스케쥴 생성
- `GET /api/schedules/{id}` - 특정 스케쥴 조회
- `PUT /api/schedules/{id}` - 스케쥴 수정
- `DELETE /api/schedules/{id}` - 스케쥴 삭제

## DevOps 파이프라인 구성

### Docker
- FastAPI 애플리케이션 컨테이너화
- React 빌드 및 정적 파일 서빙
- docker-compose.yml로 로컬 개발 환경 구성

### GitHub Actions (CI/CD)
- Trigger: main 브랜치 push/PR
- 테스트: pytest 자동화
- 빌드: Docker 이미지 생성
- 배포: Render로 자동 배포

### Render 배포
- FastAPI 백엔드 서비스 배포
- 환경 변수 관리
- 자동 재배포

## 프로젝트 구조

schedule-management-service/ ├── backend/ │ ├── app/ │ │ ├── main.py │ │ ├── models.py │ │ ├── schemas.py │ │ └── api/ │ │ └── routes.py │ ├── tests/ │ │ ├── test_main.py │ │ └── test_schedules.py │ ├── requirements.txt │ └── Dockerfile ├── frontend/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ └── App.jsx │ ├── package.json │ └── Dockerfile ├── docker-compose.yml ├── .github/ │ └── workflows/ │ └── ci-cd.yml └── README.md


## 코딩 규칙

### Python (Backend)
- PEP 8 스타일 가이드 준수
- Type hints 사용
- 함수별 docstring 작성
- 적절한 HTTP 상태 코드 반환

### React (Frontend)
- 함수형 컴포넌트 사용
- Hooks 활용 (useState, useEffect 등)
- 컴포넌트별 파일 분리

### Docker
- 멀티스테이지 빌드
- 헬스 체크 정의
- 환경 변수 외부화

## 테스트 전략

### 백엔드 테스트
- pytest 프레임워크 사용
- 단위 테스트 작성
- 통합 테스트 작성
- 커버리지 목표: 80% 이상

## 배포 전 체크리스트
- [ ] 모든 테스트 통과
- [ ] Docker 이미지 빌드 성공
- [ ] 로컬 docker-compose 정상 작동
- [ ] GitHub Actions 워크플로우 성공
- [ ] Render 배포 완료

## 도움 요청 시 포함할 정보
1. 에러 메시지
2. 관련 코드 스니펫
3. 이미 시도한 해결책
4. 예상 결과 vs 실제 결과
