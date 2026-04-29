import React from 'react';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div>
      {/* 헤더를 flex 로 가로 정렬 */}
      <header
        className="app-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {/* 아이콘 */}
        <span
          className="header-icon"
          style={{ fontSize: '1.8rem', marginRight: '0.75rem' }}
        >
          🏃
        </span>

        {/* 메인 텍스트 + 서브 텍스트 */}
        <h1
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}
        >
          헬스케어 스케줄 관리 서비스
          {/* 서브 텍스트를 작게, 색을 살짝 다르게 */}
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 'normal',
              color: '#fff',
              marginLeft: '0.5rem',
            }}
          >
            기록해 몸바디
          </span>
        </h1>
      </header>

      <Home />
    </div>
  );
}

export default App;
