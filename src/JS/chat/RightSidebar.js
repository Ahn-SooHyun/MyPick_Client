// RightSidebar.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Input, Card } from 'antd';
import styles from './RightSidebar.module.css';

const { Title, Paragraph } = Typography;

/**
 * 1) CLIENT_ID: Spotify Developer Dashboard에서 발급받은 Client ID
 * 2) REDIRECT_URI: (대시보드에도 동일 등록)
 * 3) SCOPES: 필요한 권한들 (임의 예시)
 */
const CLIENT_ID = '4577a757b824401bbd80ca571742f17a';
const REDIRECT_URI = 'https://localhost:3000/chat';
const SCOPES = 'user-read-private user-read-email streaming';

function RightSidebar({
  // 앱 내부 로그인 여부, 관리자 여부, 사용자 이메일
  isLoggedIn = false,
  isAdmin = false,
  userEmail = ''
}) {
  const navigate = useNavigate();

  // --------------------
  // (A) Spotify 로그인
  // --------------------
  const handleSpotifyLogin = () => {
    const authUrl =
      `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}`
      + `&response_type=token`
      + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
      + `&scope=${encodeURIComponent(SCOPES)}`;

    console.log('Redirecting to:', authUrl);
    window.location.href = authUrl;
  };

  // 해시 파싱 → 토큰 추출 → /chat 이동
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get('access_token');

      if (_token) {
        setAccessToken(_token);
        console.log('Got Access Token:', _token);
        navigate('/chat', { replace: true });
      }
    }
  }, [navigate]);

  // --------------------
  // (B) Spotify Web Playback SDK 초기화
  // --------------------
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Spotify 검색어(가수 + 곡명)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!accessToken) return;

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: 'My React Web Player',
        getOAuthToken: cb => cb(accessToken),
        volume: 0.5
      });

      newPlayer.addListener('initialization_error', e => console.error('Init Error:', e.message));
      newPlayer.addListener('authentication_error', e => console.error('Auth Error:', e.message));
      newPlayer.addListener('account_error', e => {
        console.error('Account Error:', e.message);
        alert('Spotify Premium 계정이 필요합니다!');
      });
      newPlayer.addListener('playback_error', e => console.error('Playback Error:', e.message));

      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID:', device_id);
        setDeviceId(device_id);
      });

      newPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID is offline:', device_id);
      });

      newPlayer.addListener('player_state_changed', state => {
        if (!state) return;
        setIsPaused(state.paused);

        const track = state.track_window.current_track;
        if (track) {
          setCurrentTrack({
            name: track.name,
            album: track.album.name,
            artist: track.artists.map(a => a.name).join(', '),
            albumImage: track.album.images[0]?.url,
          });
        } else {
          setCurrentTrack(null);
        }
      });

      newPlayer.connect().then(success => {
        if (success) {
          console.log('Web Playback SDK connected!');
        } else {
          console.error('Failed to connect Web Playback SDK');
        }
      });

      setPlayer(newPlayer);
    };

    if (window.Spotify && window.Spotify.Player) {
      window.onSpotifyWebPlaybackSDKReady();
    }
  }, [accessToken]);

  // --------------------
  // (C) Spotify 재생 기능
  // --------------------
  const handleSearchAndPlay = async () => {
    if (!searchQuery.trim()) {
      alert('가수명 + 곡 제목 입력이 필요합니다!');
      return;
    }
    if (!deviceId) {
      alert('재생 디바이스가 준비 안 됨');
      return;
    }
    if (!accessToken) {
      alert('Spotify Access Token이 없습니다. 로그인해주세요.');
      return;
    }

    try {
      const q = encodeURIComponent(searchQuery.trim());
      const SEARCH_URL = `https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`;

      const res = await fetch(SEARCH_URL, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (!data.tracks || data.tracks.items.length === 0) {
        alert('검색 결과가 없습니다!');
        return;
      }

      const trackUri = data.tracks.items[0].uri;
      console.log('Track URI:', trackUri);

      const PLAY_URL = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
      await fetch(PLAY_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [trackUri] })
      });

    } catch (err) {
      console.error(err);
      alert('오류 발생. 콘솔 확인 부탁');
    }
  };

  const handleTogglePlay = () => {
    if (!player) return;
    player.togglePlay().catch(e => console.error('TogglePlay Error:', e));
  };

  // --------------------
  // (D) 앱 내부 로그인 로직
  // --------------------
  const goLogin = () => navigate('/login');
  const goMyPage = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    navigate('/mypage');
  };

  const goAdminPage = () => navigate('/adminPage');
  const handleLogout = () => {
    alert('로그아웃 (데모용)');
    // 실제 쿠키/로컬스토리지 삭제 로직 필요 시 추가
    navigate('/login');
  };

  return (
    <div className={styles.sideContainer}>
      {/* 상단 영역: 로그인 여부 확인 → "ID 님, 반갑습니다" */}
      {isLoggedIn && userEmail && (
        <Paragraph className={styles.userGreet}>
          {userEmail} 님, 반갑습니다!
        </Paragraph>
      )}

      {!isLoggedIn && (
        <Button
          type="primary"
          block
          className={styles.topButton}
          onClick={goLogin}
        >
          로그인 (앱 내부)
        </Button>
      )}

      {/* 마이페이지 / 관리자 / 로그아웃 */}
      {isLoggedIn && (
        <div className={styles.loginArea}>
          <Button
            block
            className={styles.topButton}
            onClick={goMyPage}
          >
            마이페이지
          </Button>
          {isAdmin && (
            <Button
              type="dashed"
              block
              className={styles.midButton}
              onClick={goAdminPage}
            >
              관리자 페이지
            </Button>
          )}
          <Button
            danger
            block
            className={styles.bottomButton}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      )}

      {/* (E) Spotify 영역: 아래 정렬 */}
      <div className={styles.spotifyArea}>
        {!accessToken ? (
          <Paragraph className={styles.spotifyStatus}>
            Spotify 미로그인
          </Paragraph>
        ) : (
          <Paragraph className={styles.spotifyStatus} style={{ color: 'lightgreen' }}>
            Spotify 로그인 OK
          </Paragraph>
        )}
        <Button
          className={styles.spotifyLoginBtn}
          type="primary"
          block
          onClick={handleSpotifyLogin}
        >
          Spotify 로그인하기
        </Button>

        <Card className={styles.spotifyCard}>
          <Title level={5}>Web Playback SDK 재생</Title>
          <Paragraph>
            가수명 + 곡 제목으로 검색 후 재생 (Spotify 로그인 필요)
          </Paragraph>

          <Input
            placeholder="예: 아이유 밤편지"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ marginBottom: 8 }}
          />

          <Button 
            type="primary" 
            onClick={handleSearchAndPlay} 
            block 
            disabled={!accessToken}
          >
            검색 & 재생
          </Button>

          <Button 
            onClick={handleTogglePlay} 
            block 
            style={{ marginTop: 8 }} 
            disabled={!accessToken}
          >
            {isPaused ? '재생 ▶' : '일시정지 ⏸'}
          </Button>

          {currentTrack && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Paragraph>
                <strong>현재 재생 중:</strong><br />
                {currentTrack.artist} - {currentTrack.name} <br />
                ({currentTrack.album})
              </Paragraph>
              {currentTrack.albumImage && (
                <img
                  src={currentTrack.albumImage}
                  alt="Album Art"
                  style={{ width: 100, borderRadius: 8 }}
                />
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default RightSidebar;
