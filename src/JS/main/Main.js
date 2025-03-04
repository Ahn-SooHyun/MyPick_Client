import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../util/api/axiosSetting";
import "../../css/main/style.css";
import mainTopVideo from "../../assets/img/mainTopVideo.mp4";
import 메인큐브 from "../../assets/img/back/cube.mp4";
import musicPlayIcon from "../../assets/icon/play.png";
import 게임컨텐츠배경 from "../../assets/img/back/packman.mp4";

import MILLION from "../../assets/img/music/300MILLION.jpg";
import DNA from "../../assets/img/music/dna.jpg";
import 그래도돼 from "../../assets/img/music/그래도돼.jpg";
import 답을줘 from "../../assets/img/music/답을줘.jpg";
import 레블하트 from "../../assets/img/music/레블하트.jpg";

import 발로란트 from "../../assets/img/game/발로란트.png";
import 리그오브레전드 from "../../assets/img/game/리그오브레전드.jpg";
import 메이플스토리 from "../../assets/img/game/메이플스토리.jpg";
import 슈퍼마리오 from "../../assets/img/game/슈퍼마리오.jpeg";
import 배틀그라운드 from "../../assets/img/game/배틀그라운드.jpeg";

import 기록이라는세계 from "../../assets/img/book/기록이라는세계.jpg";
import 머큐리테일 from "../../assets/img/book/머큐리테일.jpg";
import 바다를말하는하얀고래 from "../../assets/img/book/바다를말하는하얀고래.jpg";
import 사소한불행 from "../../assets/img/book/사소한불행.jpg";
import 어떤어른 from "../../assets/img/book/어떤어른.jpg";

import 반도 from "../../assets/img/movie/반도.jpg";
import 테넷 from "../../assets/img/movie/테넷.jpg";
import 여름이끝날무렵 from "../../assets/img/movie/여름이끝날무렵.jpg";
import 트랜스포머one from "../../assets/img/movie/트랜스포머one.jpg";
import 래시 from "../../assets/img/movie/래시.jpg";

import hero1 from "../../assets/img/hero/hero1.jpeg";
import hero2 from "../../assets/img/hero/hero2.jpeg";
import hero3 from "../../assets/img/hero/hero3.jpeg";
import hero4 from "../../assets/img/hero/hero4.jpeg";
import hero5 from "../../assets/img/hero/hero5.jpeg";
import hero6 from "../../assets/img/hero/hero6.jpeg";
import hero7 from "../../assets/img/hero/hero7.jpeg";
import hero8 from "../../assets/img/hero/hero8.jpeg";

// 외부 리소스(src, public) 경로도 프로젝트에 맞게 수정하세요.
// 예: public 폴더에 영상, 이미지 등을 넣으셨다면 "public/..." 형태로 접근 가능합니다.
//     혹은 src 내에 import 후 사용하셔도 됩니다.

export default function Main() {
  // ------------------------------------------------------------
  // ① IntersectionObserver를 이용한 섹션 애니메이션
  // ------------------------------------------------------------
  const sectionRefs = useRef([]);
  const [observer, setObserver] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (!sectionRefs.current) return;

    // 실제 콜백 함수
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("action");
        } else {
          entry.target.classList.remove("action");
        }
      });
    };

    // 옵저버 생성
    const newObserver = new IntersectionObserver(callback, {
      threshold: 0.7,
      rootMargin: "0px",
    });
    setObserver(newObserver);
  }, []);

  // 섹션별로 observer.observe() 등록
  useEffect(() => {
    if (observer) {
      sectionRefs.current.forEach((section) => {
        if (section) observer.observe(section);
      });
    }
  }, [observer]);

  // ------------------------------------------------------------
  // ② footerSubjectActionBar 토글
  // ------------------------------------------------------------
  const [isFooterOpen, setFooterOpen] = useState(false);
  const toggleFooter = () => {
    setFooterOpen(!isFooterOpen);
  };

  // ------------------------------------------------------------
  // ③ 기능(공지사항, 소개, 채팅, 게시판) 구분
  // ------------------------------------------------------------
  const [featureType, setFeatureType] = useState("notice"); // 기본 notice로
  const [featureTitle, setFeatureTitle] = useState("공지사항");
  const [noticeData, setNoticeData] = useState([]);
  const [boardData, setBoardData] = useState([]);

  // Fetch the data from the API using const and async function
  const fetchNoticeData = async () => {
    try {
      const response = await api.get("/community/notice/listMain");
      setNoticeData(response.data.data); // response.data.data를 사용
    } catch (error) {
      console.error("There was an error fetching the notice data!", error);
    }
  };

  const fetchBoardData = async () => {
    try {
      const response = await api.get("/community/board/listMain");
      setBoardData(response.data.data); // response.data.data를 사용
    } catch (error) {
      console.error("There was an error fetching the board data!", error);
    }
  };

  const fetchData = () => {
    fetchNoticeData();
    fetchBoardData();
  };

  const onSelectFeature = (type) => {
    setFeatureType(type);
    switch (type) {
      case "notice":
        setFeatureTitle("공지사항");
        break;
      case "intro":
        setFeatureTitle("소개");
        break;
      case "chat":
        setFeatureTitle("채팅");
        break;
      case "board":
        setFeatureTitle("게시판");
        break;
      default:
        setFeatureTitle("공지사항");
    }
  };

  // ------------------------------------------------------------
  // ④ 마우스 오버 시 효과(음악, 게임, 영화 등)
  // ------------------------------------------------------------
  // - 음악 리스트
  const musicMenuList = [
    {
      title: "300MILLION",
      img: MILLION,
      link: "https://www.youtube.com/watch?v=2wA_b6YHjqQ",
    },
    {
      title: "DNA",
      img: DNA,
      link: "https://www.youtube.com/watch?v=MBdVXkSdhwU",
    },
    {
      title: "그래도돼",
      img: 그래도돼,
      link: "https://www.youtube.com/watch?v=bo_dfa1p950",
    },
    {
      title: "답을 줘",
      img: 답을줘,
      link: "https://www.youtube.com/watch?v=a8fy2N6hQCA",
    },
    {
      title: "레블하트",
      img: 레블하트,
      link: "https://www.youtube.com/watch?v=g36q0ZLvygQ",
    },
  ];

  // - 게임 리스트
  const gameMenuList = [
    {
      title: "발로란트",
      img: 발로란트,
      link: "https://playvalorant.com/ko-kr/",
    },
    {
      title: "League of Legends",
      img: 리그오브레전드,
      link: "https://www.leagueoflegends.com/ko-kr/",
    },
    {
      title: "Batle Ground",
      img: 배틀그라운드,
      link: "https://pubg.game.daum.net/pubg/index.daum",
    },
    {
      title: "슈퍼 마리오",
      img: 슈퍼마리오,
      link: "https://search.danawa.com/dsearch.php?k1=%EC%8A%88%ED%8D%BC%EB%A7%88%EB%A6%AC%EC%98%A4&utm_source=naver&utm_medium=cpc&utm_campaign=keyword&n_media=335738&n_query=%EC%8A%88%ED%8D%BC%EB%A7%88%EB%A6%AC%EC%98%A4&n_rank=7&n_ad_group=grp-m001-01-000001071314424&n_ad=nad-a001-01-000000271838530&n_keyword_id=nkw-a001-01-000006185653570&n_keyword=%EC%8A%88%ED%8D%BC%EB%A7%88%EB%A6%AC%EC%98%A4&n_campaign_type=1&n_ad_group_type=1&n_match=1&NaPm=ct%3Dm63ll5w0%7Cci%3D0Ai0003EW8LBtzp9ILln%7Ctr%3Dsa%7Chk%3D3f3d27ea4af45811df8b491422c9a546159fc655%7Cnacn%3DVsw4BcAv6oNy",
    },
    {
      title: "메이플스토리",
      img: 메이플스토리,
      link: "https://maplestory.nexon.com/Home/Main",
    },
  ];

  // - 도서 리스트
  const bookMenuList = [
    {
      title: "기록이라는세계",
      img: 기록이라는세계,
      content:
        "삶의 순간들을 기록하고 기억하는 방식에 대해 탐구하는 책입니다. 기록을 통해 개인과 사회가 형성되고 발전하는 과정을 다루며, 기록의 중요성을 새롭게 조명합니다.",
      link: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000010858909",
    },
    {
      title: "머큐리테일",
      img: 머큐리테일,
      content:
        "현실과 상상을 넘나드는 독특한 이야기로, 현대 사회의 다양한 문제를 은유적으로 풀어냅니다. 독특한 캐릭터와 반전 있는 스토리로 독자들에게 깊은 인상을 남깁니다.",
      link: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000010873196",
    },
    {
      title: "바다를말하는하얀고래",
      img: 바다를말하는하얀고래,
      content:
        "자연과 인간의 관계를 탐구하며, 바다를 배경으로 펼쳐지는 철학적이고 서정적인 이야기를 그립니다. 환경과 생태에 대한 메시지가 돋보이는 작품입니다.",
      link: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000010865732",
    },
    {
      title: "사소한불행",
      img: 사소한불행,
      content:
        "일상 속에서 겪는 작은 불행들을 유머와 공감을 담아 풀어낸 책입니다. 우리의 삶에서 흔히 지나치는 순간들을 돌아보게 하며, 삶의 의미를 재해석합니다.",
      link: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000010854793",
    },
    {
      title: "어떤어른",
      img: 어떤어른,
      content:
        "어른이 되는 과정에서 느끼는 고민과 성장을 담은 에세이입니다. 삶의 다양한 경험을 통해 성숙해지는 모습을 따뜻하고 현실적으로 그려내며, 공감을 불러일으킵니다.",
      link: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000010850059",
    },
  ];

  // - 영화 리스트
  const movieMenuList = [
    {
      title: "반도",
      description: "좀비 액션 블록버스터",
      img: 반도, // 중괄호 제거
      src: "https://www.youtube.com/embed/fcueArgm800?si=sa3lOeHg1XVKwt2z",
      link: "https://www.google.com/search?q=%EB%B0%98%EB%8F%84&sca_esv=e5400330830f0b9e&sxsrf=ADLYWILxiSEk3-6dIJtCIYE3sZI6oTcx5A%3A1737290719464&ei=3_OMZ9zuG--evr0P-drZ0Qc&ved=0ahUKEwic2tGh6IGLAxVvj68BHXltNnoQ4dUDCA8&uact=5&oq=%EB%B0%98%EB%8F%84&gs_lp=Egxnd3Mtd2l6LXNlcnAiBuuwmOuPhDIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYR0iZAVAAWABwAXgBkAEAmAEAoAEAqgEAuAEDyAEAmAIBoAIDmAMAiAYBkAYKkgcBMaAHAA&sclient=gws-wiz-serp",
    },
    {
      title: "테넷",
      img: 테넷,
      src: "https://www.youtube.com/embed/IW_khaePCBE?si=tcC87egqF7PLrfz3",
      link: "https://www.google.com/search?q=%ED%85%8C%EB%84%B7&sca_esv=e5400330830f0b9e&sxsrf=ADLYWIK6W00QQI4ugdxncUWO0qm5kGB-6Q%3A1737290756360&ei=BPSMZ9rUFY_91e8P5fjN0AI&ved=0ahUKEwja5p2z6IGLAxWPfvUHHWV8EyoQ4dUDCA8&uact=5&oq=%ED%85%8C%EB%84%B7&gs_lp=Egxnd3Mtd2l6LXNlcnAiBu2FjOuEtzIKEC4YgAQYQxiKBTIFEAAYgAQyChAAGIAEGEMYigUyChAAGIAEGEMYigUyChAAGIAEGEMYigUyBRAuGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQLhiABDIZEC4YgAQYQxiKBRiXBRjcBBjeBBjgBNgBAUieAlAAWABwAHgBkAEAmAHTAaAB0wGqAQMyLTG4AQPIAQD4AQL4AQGYAgGgAtcBmAMAugYGCAEQARgUkgcDMi0xoAezCw&sclient=gws-wiz-serp",
    },
    {
      title: "여름이끝날무렵",
      img: 여름이끝날무렵,
      src: "https://www.youtube.com/embed/3tem5-yksss?si=PH23zxTPq8oYccSe",
      link: "https://www.google.com/search?q=%EC%97%AC%EB%A6%84%EC%9D%B4%EB%81%9D%EB%82%A0%EB%AC%B4%EB%A0%B5&sca_esv=e5400330830f0b9e&sxsrf=ADLYWIK-gK-vT2VyyQx0ZAXQfaMLcgPWhw%3A1737290762678&ei=CvSMZ4SLKdqG1e8PlKqbwQw&ved=0ahUKEwiEuJ-26IGLAxVaQ_UHHRTVJsgQ4dUDCA8&uact=5&oq=%EC%97%AC%EB%A6%84%EC%9D%B4%EB%81%9D%EB%82%A0%EB%AC%B4%EB%A0%B5&gs_lp=Egxnd3Mtd2l6LXNlcnAiFeyXrOumhOydtOuBneuCoOustOugtTIFEAAYgAQyBRAAGO8FMggQABiABBiiBDIFEAAY7wUyBRAAGO8FSL8FUPUDWPUDcAF4AZABAJgBgAGgAYABqgEDMC4xuAEDyAEA-AEC-AEBmAICoAKDAcICChAAGLADGNYEGEeYAwCIBgGQBgqSBwMxLjGgB5UD&sclient=gws-wiz-serp",
    },
    {
      title: "트랜스포머one",
      img: 트랜스포머one,
      src: "https://www.youtube.com/embed/wKiwHP3s5hI?si=BVfYtJRttD1EvEE0",
      link: "https://www.google.com/search?q=%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%EB%A8%B8one&sca_esv=e5400330830f0b9e&sxsrf=ADLYWIICD03397IKN844yJ8ibB5b1eI--Q%3A1737290768360&ei=EPSMZ9jRFcuZvr0P0Yjq-AU&ved=0ahUKEwjYmfq46IGLAxXLjK8BHVGEGl8Q4dUDCA8&uact=5&oq=%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%AC%EB%A8%B8one&gs_lp=Egxnd3Mtd2l6LXNlcnAiEu2KuOuenOyKpO2PrOuouG9uZTIFEC4YgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIEEAAYHjIEEAAYHjIEEAAYHjIEEAAYHjIUEC4YgAQYlwUY3AQY3gQY4ATYAQFI1QNQigJYigJwAXgBkAEAmAF6oAF6qgEDMC4xuAEDyAEA-AEC-AEBmAICoAKBAcICChAAGLADGNYEGEeYAwCIBgGQBgK6BgYIARABGBSSBwMxLjGgB5MI&sclient=gws-wiz-serp",
    },
    {
      title: "래시",
      img: 래시,
      src: "https://www.youtube.com/embed/UQ7ZA0cDwMk?si=4upr8A5r7PIkdqQz",
      link: "https://www.google.com/search?q=%EB%9E%98%EC%8B%9C&sca_esv=e5400330830f0b9e&sxsrf=ADLYWIIWnQSr09Cfxg8ZWy2VEun8L-PMIg%3A1737290775027&ei=F_SMZ_uyAcWFvr0Pn6XqoA8&ved=0ahUKEwi7mpG86IGLAxXFgq8BHZ-SGvQQ4dUDCA8&uact=5&oq=%EB%9E%98%EC%8B%9C&gs_lp=Egxnd3Mtd2l6LXNlcnAiBuuemOyLnDIIEC4YgAQYsQMyCBAuGIAEGNQCMgUQABiABDIFEAAYgAQyBRAAGIAEMggQLhiABBjUAjIFEAAYgAQyBRAAGIAEMgcQABiABBgKMgcQABiABBgKMhcQLhiABBixAxiXBRjcBBjeBBjfBNgBAUieBFCTAliTAnABeAGQAQCYAZ4BoAGeAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqACqQHCAgoQABiwAxjWBBhHmAMAiAYBkAYKugYGCAEQARgUkgcDMS4xoAeQEA&sclient=gws-wiz-serp",
    },
  ];

  // 현재 영화 iFrame에 띄울 URL
  const [currentMovieSrc, setCurrentMovieSrc] = useState(
    "https://www.youtube.com/embed/xjqwsRanSls?si=Bf1m1RZ-jqVQhAmE&mute=1&autoplay=1&loop=1"
  );

  const handleMouseOverMovie = (src) => {
    setCurrentMovieSrc(src + "&mute=1&autoplay=1");
  };

  // ------------------------------------------------------------
  // ⑤ 스크롤 시 회전 애니메이션
  // ------------------------------------------------------------
  const faqBoxHeroRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!faqBoxHeroRef.current) return;
      const scrollRotation = window.scrollY * 0.5;
      faqBoxHeroRef.current.style.transform = `perspective(1000px) rotateY(${scrollRotation}deg)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ------------------------------------------------------------
  // ⑦ 실제 렌더링
  // ------------------------------------------------------------
  return (
    <>
      <div className="main-container">
        {/* 상단 영역 */}
        <div className="main-top-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src={mainTopVideo} type="video/mp4" />
          </video>

          {/* 여러 개의 Section을 렌더링, 각 ref 등록 */}
          <section
            className="first-action test-border-transparent"
            ref={(el) => (sectionRefs.current[0] = el)}
          >
            <div className="main-top-banner-text section-first">
              <span className="first-text">
                사용자의 취향을 읽고, 광고 없이 다채로운 미디어를 추천합니다.
              </span>
              <br />
              <span className="second-text">
                "오직 당신을 위한, 맞춤형 추천 플랫폼"{" "}
              </span>
              <br />
              <span className="second-title">MyPick</span>
            </div>
          </section>

          <section
            className="test-border-transparent"
            ref={(el) => (sectionRefs.current[1] = el)}
          >
            <div className="main-top-banner-text section-second">
              <span className="first-text">
                언제든 접속 가능한 24시간 서버로, 영화·음악·도서 등
              </span>
              <br />
              <span className="second-text">
                다양한 미디어를 즉시 만나보세요. 간편한 인터페이스가
              </span>
              <br />
              <span className="third-text">
                유저 편의성과 풍부한 추천 경험을 동시에 선사합니다.
              </span>
            </div>
          </section>

          <section
            className="test-border-transparent"
            ref={(el) => (sectionRefs.current[2] = el)}
          >
            <div className="main-top-banner-text section-third">
              <span className="first-text">
                하나의 가입으로 시작되는 끝없는 즐거움,
              </span>
              <br />
              <span className="second-title">MyPick</span>
              <span className="second-text">
                과 함께 매일을 더 새롭고 다채롭게 만들어보세요.
              </span>
              <br />
            </div>
          </section>
        </div>

        <div className="main-content">
          <div className="main-page">
            {/* 주요 기능(Features) */}
            <div className="main-action-area">
              <div className="main-action-area-title">주요 기능(Features)</div>
              <div className="main-action-area-content">
                <div
                  className="main-action-area-content-item"
                  data-type="notice"
                  onClick={() => onSelectFeature("notice")}
                >
                  <div className="icon"></div>
                  <div className="title">Notice</div>
                  <div className="content">Notice Board</div>
                </div>

                <div
                  className="main-action-area-content-item"
                  data-type="intro"
                  onClick={() => onSelectFeature("intro")}
                >
                  <div className="icon"></div>
                  <div className="title">Intro</div>
                  <div className="content">Introduction</div>
                </div>

                <div
                  className="main-action-area-content-item"
                  data-type="chat"
                  onClick={() => onSelectFeature("chat")}
                >
                  <div className="icon"></div>
                  <div className="title">Chat</div>
                  <div className="content">Chatting</div>
                </div>

                <div
                  className="main-action-area-content-item"
                  data-type="board"
                  onClick={() => onSelectFeature("board")}
                >
                  <div className="icon"></div>
                  <div className="title">Board</div>
                  <div className="content">Board Comuntiy</div>
                </div>
              </div>

              {/* main action 기능 보이기 */}
              <div className="main-action-area-list">
                <div className="calout">
                  <div className="title">{featureTitle}</div>
                  {/* <div className="content">content</div> */}
                </div>

                <div className="list">
                  {/* featureType 에 따른 내용 분기 */}
                  {featureType === "notice" &&
                    noticeData.map((item) => (
                      <div className="main-item" key={item.idx}>
                        <div className="icon notice"></div>
                        <div className="content">
                          <div className="title">{item.title}</div>
                          <div className="create">{item.editor_date}</div>
                        </div>
                      </div>
                    ))}

                  {featureType === "board" &&
                    boardData.map((item) => (
                      <div className="main-item" key={item.idx}>
                        <div className="icon board"></div>
                        <div className="content">
                          <div className="title">{item.title}</div>
                          <div className="create">{item.editor_date}</div>
                        </div>
                      </div>
                    ))}

                  {featureType === "chat" && (
                    <div className="main-chat">
                      <div className="chat-img"></div>
                      <div className="chat-content">
                        <div className="chat-description">
                          안녕하세요! 저는 당신의 편리한 사이트 이용을 도와드릴
                          AI 채팅 도우미입니다. 원하시는 정보나 기능을
                          자연스럽게 말씀해 주시면, 최적의 컨텐츠로 안내해
                          드리겠습니다. 공지사항, 게시판, 소개 등 궁금하신 점을
                          편하게 물어보세요!
                        </div>
                        <div className="btn">
                          <span onClick={() => navigate("/chat")}>
                            Chatting
                          </span>
                          <div className="dot"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {featureType === "intro" && (
                    <div className="main-intro">
                      <div className="intro-img"></div>
                      <div className="intro-content">
                        <div className="intro-description">
                          안녕하세요! 저는 당신의 편리한 사이트 이용을 도와드릴
                          AI 채팅 도우미입니다. 원하시는 정보나 기능을
                          자연스럽게 말씀해 주시면, 최적의 컨텐츠로 안내해
                          드리겠습니다. 공지사항, 게시판, 소개 등 궁금하신 점을
                          편하게 물어보세요!
                        </div>
                        <div className="btn">
                          <span onClick={() => navigate("/chat")}>Creater</span>
                          <div className="dot"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 메인 컨텐츠 ( 음악, 게임, 도서, 영화 ) */}
            <div className="main-page-content">
              {/* 음악 영역 */}
              <div
                className="main-page-content-box music"
                style={{ backgroundImage: `url('${musicMenuList[0].img}')` }}
              >
                <div className="main-page-content-box-title">음악</div>
                <div className="main-page-content-box-content">
                  {/* prev button */}
                  <div className="main-list-button">
                    <button>{"<"}</button>
                  </div>

                  <div className="list">
                    {musicMenuList.map((music, idx) => (
                      <a href={`${music.link}`} key={idx}>
                        <div
                          className="mainPage-content-item music"
                          key={idx}
                          onMouseOver={(e) => {
                            // 배경 교체
                            e.currentTarget.parentNode.parentNode.parentNode.style.backgroundImage = `url('${music.img}')`;
                            // .mainPage-content-item-ov 클래스로 전환
                            console.log(e.currentTarget);

                            e.currentTarget.classList.add("action");
                          }}
                          onMouseOut={(e) => {
                            // 원복
                            e.currentTarget.classList.remove("action");
                          }}
                        >
                          <div className="before-imgBx">
                            <img src={music.img} alt={music.title} />
                          </div>

                          <div className="mainPage-content-hoverItem">
                            <div className="imgBx">
                              <img src={music.img} alt={music.title} />
                            </div>
                            <div className="content">
                              <div className="title">{music.title}</div>
                            </div>
                            <div className="img-area">
                              <img src={musicPlayIcon} alt="재생 아이콘" />
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* next button */}
                  <div className="main-list-button">
                    <button>{">"}</button>
                  </div>
                </div>
              </div>

              {/* 게임 영역 */}
              <div className="main-page-content-box game">
                <div className="main-page-content-box-title">게임</div>
                <div className="main-page-content-box-content">
                  <video className="bg-video__content" autoPlay muted loop>
                    <source src={게임컨텐츠배경} type="video/mp4" />
                  </video>

                  {/* prev button */}
                  <div className="main-list-button">
                    <button>{"<"}</button>
                  </div>

                  <div className="list">
                    {gameMenuList.map((game, idx) => (
                      <a href={`${game.link}`} key={idx}>
                        <div
                          className="mainPage-content-box game"
                          onMouseOver={(e) =>
                            e.currentTarget.classList.add("action")
                          }
                          onMouseOut={(e) =>
                            e.currentTarget.classList.remove("action")
                          }
                        >
                          <div className="imgBx">
                            <img src={game.img} alt={game.title} />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* next button */}
                  <div className="main-list-button">
                    <button>{">"}</button>
                  </div>
                </div>
              </div>

              {/* 도서 영역 */}
              <div className="main-page-content-box book">
                <div className="main-page-content-box-book-title">도서</div>
                <div className="main-page-content-box-content">
                  {/* prev button */}
                  <div className="main-list-button">
                    <button>{"<"}</button>
                  </div>

                  <div className="list">
                    {bookMenuList.map((book, idx) => (
                      <a href={`${book.link}`} key={idx}>
                        <section
                          id="pageSection"
                          className="mainPage-content-box book"
                        >
                          <div className="page" id="page1">
                            <img src={book.img} alt={book.title} />
                          </div>
                          <div className="page" id="page2">
                            <h2>{book.title}</h2>
                            <span>{book.content}</span>
                          </div>
                        </section>
                      </a>
                    ))}
                  </div>

                  {/* next button */}
                  <div className="main-list-button">
                    <button>{">"}</button>
                  </div>
                </div>
              </div>

              {/* 영화 영역 */}
              <div className="main-page-content-movie-box movie">
                <div className="main-page-content-box-title">영화</div>
                {/* screen 영역 */}
                <div className="screen">
                  <iframe
                    width="560"
                    height="315"
                    src={currentMovieSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* 영화 목록 */}
                <div className="main-page-content-box-content">
                  {/* prev button */}
                  <div className="main-list-button">
                    <button>{"<"}</button>
                  </div>

                  <div className="list">
                    {movieMenuList.map((movie, idx) => (
                      <a href={`${movie.link}`} key={idx}>
                        <div
                          className="mainPage-content-box movie"
                          key={idx}
                          onMouseOver={() => handleMouseOverMovie(movie.src)}
                          onMouseOut={() =>
                            setCurrentMovieSrc(
                              movieMenuList[0].src + "&mute=1&autoplay=1"
                            )
                          }
                        >
                          <div className="imgBx">
                            <img src={movie.img} alt={movie.title} />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* next button */}
                  <div className="main-list-button">
                    <button>{">"}</button>
                  </div>
                </div>
              </div>
            </div>

            {/* 자주하는 질문 */}
            <div className="content-faq">
              <div className="faq-box">
                <div className="faq-list">
                  <div className="faq-item">
                    <div className="iqon"></div>
                    <span className="title">
                      Q. 서비스 이용 시간이 어떻게 되나요?
                    </span>
                    <div className="content">
                      <p>A. 24시간 365일 언제든지 이용 가능합니다.</p>
                    </div>
                  </div>

                  <div className="faq-item">
                    <div className="iqon"></div>
                    <span className="title">Q. 결제 방법은 어떻게 되나요?</span>
                    <div className="content">
                      <p>
                        A. 신용카드, 계좌이체, 휴대폰 결제 등 다양한 결제수단을
                        제공합니다.
                      </p>
                    </div>
                  </div>

                  <div className="faq-item">
                    <div className="iqon"></div>
                    <span className="title">Q. 환불 정책은 어떻게 되나요?</span>
                    <div className="content">
                      <p>
                        A. 구매 후 7일 이내 환불 가능하며, 콘텐츠 미사용 시 전액
                        환불됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="faq-item">
                    <div className="iqon"></div>
                    <span className="title">Q. 회원 가입은 어떻게 하나요?</span>
                    <div className="content">
                      <p>
                        A. 메인 페이지 우측 상단의 '회원가입' 버튼을 클릭하여
                        간단한 정보 입력 후 가입하실 수 있습니다.
                      </p>
                    </div>
                  </div>

                  <div className="faq-item">
                    <div className="iqon"></div>
                    <span className="title">
                      Q. 콘텐츠 추천은 어떤 기준으로 이루어지나요?
                    </span>
                    <div className="content">
                      <p>
                        A. 회원님의 시청 기록과 선호도를 분석하여 AI 알고리즘을
                        통해 맞춤형 콘텐츠를 추천해드립니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 히어카드 영역 */}
                <div className="faq-box-hero-area">
                  <div className="faq-box-hero" ref={faqBoxHeroRef}>
                    <span style={{ "--i": 1 }}>
                      <img src={hero1} alt="hero1" />
                    </span>
                    <span style={{ "--i": 2 }}>
                      <img src={hero2} alt="hero2" />
                    </span>
                    <span style={{ "--i": 3 }}>
                      <img src={hero3} alt="hero3" />
                    </span>
                    <span style={{ "--i": 4 }}>
                      <img src={hero4} alt="hero4" />
                    </span>
                    <span style={{ "--i": 5 }}>
                      <img src={hero5} alt="hero5" />
                    </span>
                    <span style={{ "--i": 6 }}>
                      <img src={hero6} alt="hero6" />
                    </span>
                    <span style={{ "--i": 7 }}>
                      <img src={hero7} alt="hero7" />
                    </span>
                    <span style={{ "--i": 8 }}>
                      <img src={hero8} alt="hero8" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 배경 cube */}
          <div className="back-area">
            <video className="background-container" autoPlay muted loop>
              <source src={메인큐브} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-subject" onClick={toggleFooter}>
              <div className="footer-subject-img"></div>
              <div className="footer-subject-loadingbar">
                <div
                  className={`loading-hr ${isFooterOpen ? "action-bar" : ""}`}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <span key={i} style={{ "--i": i + 1 }}></span>
                  ))}
                </div>
              </div>

              <div
                className={`footer-subject-v ${
                  isFooterOpen ? "action-bar" : ""
                }`}
              >
                <span></span>
                <span></span>
              </div>
            </div>

            <p className={`footer-content ${isFooterOpen ? "action-bar" : ""}`}>
              MyPick는 영화, 음악, 게임, 도서 등 다양한 미디어를 추천하는
              사이트입니다.
              <br />
              이 사이트는 햄식이팟 팀에 의해 개발되었으며, 개발자들은 안수현,
              박장용, 강민우, 이건호04입니다. MyPick은 최신 트렌드에 맞는
              미디어를 제공하고, 사용자 맞춤형 추천을 통해 미디어 소비의 새로운
              경험을 선사합니다. 직관적인 디자인과 알고리즘을 기반으로 콘텐츠를
              추천하며, 지속적으로 서비스를 개선하고 있습니다.
              <br />
              MyPick은 여러분이 가장 좋아할 미디어를 발견할 수 있는 공간이 될
              것입니다.
              <br />
              <br />
              Made by 햄식이팟: 안수현, 박장용, 강민우, 이건호04
            </p>
          </div>

          <div className="footer-content-btn">
            <div className="btn-area-first">
              <a
                href="https://github.com/Ahn-SooHyun/MyPick_Server"
                className="footer-content-btn-item"
              >
                <div className="footer-content-btn-item-img"></div>
                <div className="footer-content-btn-item-text">
                  <span>Server</span>
                </div>
              </a>

              <a
                href="https://github.com/Ahn-SooHyun/MyPick_Client"
                className="footer-content-btn-item"
              >
                <div className="footer-content-btn-item-img"></div>
                <div className="footer-content-btn-item-text">
                  <span>Front</span>
                </div>
              </a>
            </div>

            <div className="btn-area-second">
              <a
                href="https://cnsu.ac.kr/int/main.do"
                className="footer-content-btn-item"
              >
                <div className="footer-content-btn-item-img"></div>
                <div className="footer-content-btn-item-text">
                  <span>충남 도립 대학교</span>
                </div>
              </a>

              <a
                href="https://www.keduit.com/"
                className="footer-content-btn-item"
              >
                <div className="footer-content-btn-item-img"></div>
                <div className="footer-content-btn-item-text">
                  <span>한국 정보 교육원</span>
                </div>
              </a>

              <a
                href="https://example.com/creator"
                className="footer-content-btn-item"
              >
                <div className="footer-content-btn-item-img"></div>
                <div className="footer-content-btn-item-text">
                  <span>만든 이</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
