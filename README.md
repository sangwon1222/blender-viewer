# 개요

FBX파일을 브라우저 기반에서 로드하고 렌더링하기 위해 설계.

# 기능

- three.js와 React Three Fiber를 사용하여 FBX 모델을 렌더링.
- 카메라 조작 (마우스 왼쪽 클릭, 휠)
- 로컬 파일 시스템 접근 ( 로컬 FBX 로드 및 렌더링 )

# ToDo

- electron tray 기능 확장
- Three.js 유저가 조명 위치 조정 가능

# 스크립트

| 명령어                | 설명                                              |
| --------------------- | ------------------------------------------------- |
| `npm run dev`         | 개발 서버 실행. Electron과 React 개발 환경을 제공 |
| `npm run build`       | 전체 애플리케이션 빌드.                           |
| `npm run build:win`   | Windows용 애플리케이션 빌드.                      |
| `npm run build:mac`   | mac 애플리케이션 빌드.                            |
| `npm run build:linux` | linux 애플리케이션 빌드.                          |

# 스택

Electron + React + React Tree Fiber + Three.js + Typescript + Vite
