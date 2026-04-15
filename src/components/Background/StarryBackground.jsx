import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import earthImg from '../../assets/images/earth.jpg';
import ship from '../../assets/images/ship-removebg-preview.png';
import planetEarth from '../../assets/images/planet-earth.jpg';
import planetMars from '../../assets/images/planet-mars.jpg';
import planetJupiter from '../../assets/images/planet-jupiter.jpg';
import planetSaturn from '../../assets/images/planet-saturn.jpg';
import planetNeptune from '../../assets/images/planet-neptune.jpg';
import planetVenus from '../../assets/images/planet-venus.jpg';

const SECTIONS = ['home', 'about', 'projects', 'skills', 'contact', 'feedback'];
const TOTAL_LINES = 30;

const PLANET_NAMES = ['Earth', 'Mars', 'Jupiter', 'Saturn', 'Neptune', 'Venus'];

const PLANETS = [{
img: planetEarth,
size: '250px',
bottom: '-80px',
left: '-50px',
shadow: '0 0 10px 20px rgba(50, 149, 237, 0.3)',
glowColor: '100, 149, 237',
},
  
  { // about - Mars
    img: planetMars,
    size: '280px',
    bottom: '-50px',
    left: '10%',
    shadow: '0 0 60px 15px rgba(212, 101, 59, 0.3)',
    glowColor: '212, 101, 59',
  },
  { // projects - Jupiter
    img: planetJupiter,
    size: '420px',
    bottom: '-120px',
    left: '-80px',
    shadow: '0 0 100px 25px rgba(217, 160, 102, 0.25)',
    glowColor: '217, 160, 102',
  },
  { // skills - Saturn
    img: planetSaturn,
    size: '300px',
    bottom: '-60px',
    left: '5%',
    shadow: '0 0 70px 18px rgba(232, 201, 109, 0.25)',
    glowColor: '232, 201, 109',
    ring: true,
  },
  { // contact - Neptune
    img: planetNeptune,
    size: '260px',
    bottom: '-40px',
    left: '15%',
    shadow: '0 0 60px 15px rgba(91, 126, 201, 0.3)',
    glowColor: '91, 126, 201',
  },
  { // feedback - Venus
    img: planetVenus,
    size: '240px',
    bottom: '-30px',
    left: '8%',
    shadow: '0 0 50px 12px rgba(232, 219, 181, 0.25)',
    glowColor: '232, 219, 181',
  },
];

const StarryBackground = () => {
  const [scaleX, setScaleX] = useState(
    typeof window !== 'undefined' ? Math.max(1, window.innerWidth / 1920) : 1
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [glowing, setGlowing] = useState(false);
  const prevSection = useRef(0);

  useEffect(() => {
    const handleResize = () => setScaleX(Math.max(1, window.innerWidth / 1920));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionChange = useCallback((sectionIdx) => {
    if (sectionIdx !== prevSection.current) {
      prevSection.current = sectionIdx;
      setActiveIndex(sectionIdx);
      setGlowing(true);
      setTimeout(() => setGlowing(false), 1200);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = SECTIONS.indexOf(id);
            if (idx !== -1) handleSectionChange(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timer = setTimeout(() => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [handleSectionChange]);

  const linesPerSection = Math.floor(TOTAL_LINES / SECTIONS.length);
  const activeStart = activeIndex * linesPerSection;
  const activeEnd = activeStart + linesPerSection;

  return (
    <StyledWrapper $scaleX={scaleX}>
      <div className="container">
        <img src={earthImg} alt="Earth" className="earth-img" />
        {/* Planets */}
        {PLANETS.map((planet, i) => (
          <div
            key={i}
            className={`planet${activeIndex === i ? ' planet-visible' : ''}`}
            style={{
              width: planet.size,
              height: planet.size,
              bottom: planet.bottom,
              left: planet.left,
              boxShadow: planet.shadow,
            }}
          >
            <img src={planet.img} alt="" className="planet-texture" />
            <div className="planet-shading" />
            <div
              className="planet-atmosphere"
              style={{ boxShadow: `inset 0 0 40px rgba(${planet.glowColor}, 0.2), 0 0 60px rgba(${planet.glowColor}, 0.15)` }}
            />
            {planet.ring && (
              <div className="planet-ring" />
            )}
          </div>
        ))}
        <img src={ship} alt="Ship" className="ship-img" />
        <div className="planet-name-badge" key={activeIndex}>
          <span className="planet-name-icon">◆</span>
          <span className="planet-name-text">{PLANET_NAMES[activeIndex]}</span>
        </div>
        <div className="speed-lines" />
        <div className="speed-lines2" />
        <div className="station-bar">
          {Array.from({ length: TOTAL_LINES }).map((_, i) => {
            const isActive = i >= activeStart && i < activeEnd;
            const isGlowing = glowing && isActive;
            return (
              <div
                key={i}
                className={`station-line${isActive ? ' active' : ''}${isGlowing ? ' glow-sweep' : ''}`}
                style={isGlowing ? { animationDelay: `${(i - activeStart) * 60}ms` } : undefined}
              />
            );
          })}
        </div>
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <div id="stars4" />
        <div id="stars5" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .container {
    width: 100vw;
    height: 100vh;
    background: radial-gradient(ellipse at 100% 100%, #1b2735 0%, #121a24 40%, #090a0f 100%);
    transform: scaleX(${props => props.$scaleX});
    transform-origin: left center;
    position: relative;
  }

  .earth-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: screen;
    opacity: 0.8;
    pointer-events: none;
    z-index: -1;
  }

  .planet {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 1.2s ease, transform 1.2s ease;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  }

  .planet-visible {
    opacity: 1;
    transform: scale(1);
  }

  .planet-texture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .planet-shading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, transparent 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%);
  }

  .planet-atmosphere {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
  }

  .planet-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 170%;
    height: 35%;
    transform: translate(-50%, -50%) rotateX(75deg);
    border: 2px solid rgba(232, 201, 109, 0.3);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(232, 201, 109, 0.15), inset 0 0 10px rgba(232, 201, 109, 0.1);
    background: radial-gradient(ellipse, transparent 55%, rgba(232, 201, 109, 0.08) 65%, rgba(200, 170, 80, 0.12) 75%, transparent 85%);
  }
  .ship-img{
    position: absolute;
    top: 60px;
    right:-186px;
    width: 10%;
    height: auto;
    opacity: 0.9;
    z-index: 2;
    mix-blend-mode: screen;
  }

  .planet-name-badge {
    position: absolute;
    top: 140px;
    right: -170px;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px 5px 10px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 20px;
    backdrop-filter: blur(8px);
    animation: badgeSlideIn 0.6s ease-out;
  }

  .planet-name-icon {
    font-size: 8px;
    color: #f59e0b;
    filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.6));
    animation: badgePulse 2s ease-in-out infinite;
  }

  .planet-name-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
  }

  @keyframes badgeSlideIn {
    0% {
      opacity: 0;
      transform: translateX(15px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes badgePulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .speed-lines {
    position: absolute;
    top: 0;
    right: -186px;
    width: 300px;
    height: 100%;
    background: transparent;
    z-index: 1;
    box-shadow:
      -20px 80px rgba(255,255,255,0.6),
      -60px 160px rgba(255,255,255,0.4),
      -10px 250px rgba(255,255,255,0.5),
      -40px 340px rgba(255,255,255,0.3),
      -25px 430px rgba(255,255,255,0.6),
      -70px 520px rgba(255,255,255,0.35),
      -15px 610px rgba(255,255,255,0.5),
      -50px 700px rgba(255,255,255,0.4),
      -30px 790px rgba(255,255,255,0.55),
      -80px 880px rgba(255,255,255,0.3),
      -20px 970px rgba(255,255,255,0.45),
      -55px 1060px rgba(255,255,255,0.5),
      -35px 1150px rgba(255,255,255,0.35),
      -10px 1240px rgba(255,255,255,0.6),
      -65px 1330px rgba(255,255,255,0.4),
      -45px 1420px rgba(255,255,255,0.5),
      -20px 1510px rgba(255,255,255,0.3),
      -75px 1600px rgba(255,255,255,0.55),
      -30px 1690px rgba(255,255,255,0.4),
      -50px 1780px rgba(255,255,255,0.45);
    width: 2px;
    height: 2px;
    animation: speedFly 3s linear infinite;
  }
  .speed-lines:after {
    content: '';
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      -20px 80px rgba(255,255,255,0.6),
      -60px 160px rgba(255,255,255,0.4),
      -10px 250px rgba(255,255,255,0.5),
      -40px 340px rgba(255,255,255,0.3),
      -25px 430px rgba(255,255,255,0.6),
      -70px 520px rgba(255,255,255,0.35),
      -15px 610px rgba(255,255,255,0.5),
      -50px 700px rgba(255,255,255,0.4),
      -30px 790px rgba(255,255,255,0.55),
      -80px 880px rgba(255,255,255,0.3),
      -20px 970px rgba(255,255,255,0.45),
      -55px 1060px rgba(255,255,255,0.5),
      -35px 1150px rgba(255,255,255,0.35),
      -10px 1240px rgba(255,255,255,0.6),
      -65px 1330px rgba(255,255,255,0.4),
      -45px 1420px rgba(255,255,255,0.5),
      -20px 1510px rgba(255,255,255,0.3),
      -75px 1600px rgba(255,255,255,0.55),
      -30px 1690px rgba(255,255,255,0.4),
      -50px 1780px rgba(255,255,255,0.45);
  }

  .speed-lines2 {
    position: absolute;
    right: 40px;
    width: 1px;
    height: 1px;
    background: transparent;
    z-index: 1;
    box-shadow:
      -30px 50px rgba(255,255,255,0.5),
      -15px 180px rgba(255,255,255,0.35),
      -55px 310px rgba(255,255,255,0.6),
      -40px 440px rgba(255,255,255,0.3),
      -20px 570px rgba(255,255,255,0.5),
      -70px 700px rgba(255,255,255,0.4),
      -10px 830px rgba(255,255,255,0.55),
      -45px 960px rgba(255,255,255,0.35),
      -25px 1090px rgba(255,255,255,0.5),
      -60px 1220px rgba(255,255,255,0.3),
      -35px 1350px rgba(255,255,255,0.6),
      -15px 1480px rgba(255,255,255,0.4),
      -50px 1610px rgba(255,255,255,0.5),
      -80px 1740px rgba(255,255,255,0.35),
      -20px 1870px rgba(255,255,255,0.45);
    animation: speedFly 2.5s linear infinite;
  }
  .speed-lines2:after {
    content: '';
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      -30px 50px rgba(255,255,255,0.5),
      -15px 180px rgba(255,255,255,0.35),
      -55px 310px rgba(255,255,255,0.6),
      -40px 440px rgba(255,255,255,0.3),
      -20px 570px rgba(255,255,255,0.5),
      -70px 700px rgba(255,255,255,0.4),
      -10px 830px rgba(255,255,255,0.55),
      -45px 960px rgba(255,255,255,0.35),
      -25px 1090px rgba(255,255,255,0.5),
      -60px 1220px rgba(255,255,255,0.3),
      -35px 1350px rgba(255,255,255,0.6),
      -15px 1480px rgba(255,255,255,0.4),
      -50px 1610px rgba(255,255,255,0.5),
      -80px 1740px rgba(255,255,255,0.35),
      -20px 1870px rgba(255,255,255,0.45);
  }

  .station-bar {
    position: absolute;
    top: 0;
    right: -199px;
    width: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    z-index: 3;
    padding: 40px 0;
  }

  .station-line {
    width: 14px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1px;
    box-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
    transition: all 0.4s ease;
  }

  .station-line.active {
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(100, 180, 255, 0.4);
  }

  .station-line.glow-sweep {
    animation: stationGlow 0.8s ease-out forwards;
  }

  @keyframes stationGlow {
    0% {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
      transform: scaleX(1);
    }
    30% {
      background: rgba(100, 200, 255, 1);
      box-shadow: 0 0 12px rgba(100, 200, 255, 0.9), 0 0 24px rgba(100, 180, 255, 0.6), 0 0 40px rgba(80, 160, 255, 0.3);
      transform: scaleX(1.6);
    }
    100% {
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(100, 180, 255, 0.4);
      transform: scaleX(1);
    }
  }

  @keyframes speedFly {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-2000px);
    }
  }
  #stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff,
      1469px 678px #fff, 904px 741px #fff, 1160px 781px #fff,
      1841px 1962px #fff, 1630px 1667px #fff, 1788px 676px #fff,
      367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff,
      1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff,
      137px 1114px #fff, 1767px 1403px #fff, 1543px 11px #fff,
      1078px 181px #fff, 1189px 1574px #fff, 1697px 1551px #fff,
      439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff,
      34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff,
      169px 1907px #fff, 1219px 1125px #fff, 659px 18px #fff,
      1731px 1959px #fff, 332px 1216px #fff, 1913px 788px #fff,
      80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff,
      473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff,
      425px 1321px #fff, 1121px 1797px #fff, 731px 647px #fff,
      891px 1584px #fff, 1523px 109px #fff, 1379px 244px #fff,
      865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff,
      440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff,
      62px 729px #fff, 126px 946px #fff, 1256px 896px #fff,
      1444px 256px #fff, 661px 1628px #fff, 1078px 1716px #fff,
      300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff,
      1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff,
      665px 1531px #fff, 89px 701px #fff, 1084px 1183px #fff,
      1597px 1576px #fff, 1354px 1774px #fff, 554px 1471px #fff,
      1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff,
      638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff,
      24px 1152px #fff, 507px 558px #fff, 1262px 652px #fff,
      246px 1048px #fff, 1077px 421px #fff, 1866px 1847px #fff,
      1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff,
      1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff,
      890px 607px #fff, 787px 1235px #fff, 557px 524px #fff,
      1582px 1285px #fff, 1725px 1366px #fff, 952px 747px #fff,
      251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff,
      1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff,
      594px 510px #fff, 1345px 1990px #fff, 1919px 1803px #fff,
      1117px 966px #fff, 1629px 97px #fff, 1046px 1196px #fff,
      810px 1092px #fff, 722px 976px #fff, 406px 18px #fff,
      1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff,
      564px 239px #fff, 13px 1767px #fff, 1482px 1472px #fff,
      1700px 347px #fff, 1362px 244px #fff, 1141px 1708px #fff,
      22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff,
      1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff,
      1061px 478px #fff, 18px 1409px #fff, 729px 1364px #fff,
      264px 911px #fff, 677px 1442px #fff, 123px 33px #fff,
      1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff,
      918px 1536px #fff, 620px 948px #fff, 183px 646px #fff,
      695px 687px #fff, 881px 272px #fff, 1521px 1212px #fff,
      1423px 1022px #fff, 1545px 1271px #fff, 1393px 348px #fff,
      685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff,
      736px 999px #fff, 673px 796px #fff, 469px 850px #fff,
      1912px 142px #fff, 1278px 664px #fff, 184px 1990px #fff,
      1173px 1312px #fff, 782px 1879px #fff, 323px 1035px #fff,
      611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff,
      1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff,
      1806px 1327px #fff, 386px 575px #fff, 1550px 463px #fff,
      148px 687px #fff, 651px 1683px #fff, 1588px 1194px #fff,
      1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff,
      1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff,
      1859px 1809px #fff, 1456px 388px #fff, 186px 1627px #fff,
      1528px 1145px #fff, 171px 97px #fff, 674px 1072px #fff,
      676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff,
      1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff,
      549px 652px #fff, 1338px 74px #fff, 1749px 364px #fff,
      931px 369px #fff, 383px 1428px #fff, 1558px 389px #fff,
      927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff,
      556px 643px #fff, 401px 275px #fff, 406px 1644px #fff,
      1253px 1852px #fff, 1599px 883px #fff, 744px 1721px #fff,
      524px 1297px #fff, 1226px 1177px #fff, 1679px 55px #fff,
      874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff,
      1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff;
    animation: animStar 50s linear infinite;
  }
  #stars:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff,
      1469px 678px #fff, 904px 741px #fff, 1160px 781px #fff,
      1841px 1962px #fff, 1630px 1667px #fff, 1788px 676px #fff,
      367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff,
      1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff,
      137px 1114px #fff, 1767px 1403px #fff, 1543px 11px #fff,
      1078px 181px #fff, 1189px 1574px #fff, 1697px 1551px #fff,
      439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff,
      34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff,
      169px 1907px #fff, 1219px 1125px #fff, 659px 18px #fff,
      1731px 1959px #fff, 332px 1216px #fff, 1913px 788px #fff,
      80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff,
      473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff,
      425px 1321px #fff, 1121px 1797px #fff, 731px 647px #fff,
      891px 1584px #fff, 1523px 109px #fff, 1379px 244px #fff,
      865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff,
      440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff,
      62px 729px #fff, 126px 946px #fff, 1256px 896px #fff,
      1444px 256px #fff, 661px 1628px #fff, 1078px 1716px #fff,
      300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff,
      1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff,
      665px 1531px #fff, 89px 701px #fff, 1084px 1183px #fff,
      1597px 1576px #fff, 1354px 1774px #fff, 554px 1471px #fff,
      1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff,
      638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff,
      24px 1152px #fff, 507px 558px #fff, 1262px 652px #fff,
      246px 1048px #fff, 1077px 421px #fff, 1866px 1847px #fff,
      1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff,
      1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff,
      890px 607px #fff, 787px 1235px #fff, 557px 524px #fff,
      1582px 1285px #fff, 1725px 1366px #fff, 952px 747px #fff,
      251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff,
      1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff,
      594px 510px #fff, 1345px 1990px #fff, 1919px 1803px #fff,
      1117px 966px #fff, 1629px 97px #fff, 1046px 1196px #fff,
      810px 1092px #fff, 722px 976px #fff, 406px 18px #fff,
      1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff,
      564px 239px #fff, 13px 1767px #fff, 1482px 1472px #fff,
      1700px 347px #fff, 1362px 244px #fff, 1141px 1708px #fff,
      22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff,
      1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff,
      1061px 478px #fff, 18px 1409px #fff, 729px 1364px #fff,
      264px 911px #fff, 677px 1442px #fff, 123px 33px #fff,
      1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff,
      918px 1536px #fff, 620px 948px #fff, 183px 646px #fff,
      695px 687px #fff, 881px 272px #fff, 1521px 1212px #fff,
      1423px 1022px #fff, 1545px 1271px #fff, 1393px 348px #fff,
      685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff,
      736px 999px #fff, 673px 796px #fff, 469px 850px #fff,
      1912px 142px #fff, 1278px 664px #fff, 184px 1990px #fff,
      1173px 1312px #fff, 782px 1879px #fff, 323px 1035px #fff,
      611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff,
      1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff,
      1806px 1327px #fff, 386px 575px #fff, 1550px 463px #fff,
      148px 687px #fff, 651px 1683px #fff, 1588px 1194px #fff,
      1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff,
      1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff,
      1859px 1809px #fff, 1456px 388px #fff, 186px 1627px #fff,
      1528px 1145px #fff, 171px 97px #fff, 674px 1072px #fff,
      676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff,
      1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff,
      549px 652px #fff, 1338px 74px #fff, 1749px 364px #fff,
      931px 369px #fff, 383px 1428px #fff, 1558px 389px #fff,
      927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff,
      556px 643px #fff, 401px 275px #fff, 406px 1644px #fff,
      1253px 1852px #fff, 1599px 883px #fff, 744px 1721px #fff,
      524px 1297px #fff, 1226px 1177px #fff, 1679px 55px #fff,
      874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff,
      1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff;
  }

  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
      1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff,
      1171px 563px #fff, 661px 1919px #fff, 1610px 44px #fff,
      1275px 140px #fff, 1208px 1802px #fff, 1473px 1587px #fff,
      11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff,
      1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff,
      417px 1188px #fff, 286px 561px #fff, 393px 1765px #fff,
      147px 881px #fff, 666px 1097px #fff, 1425px 1278px #fff,
      806px 156px #fff, 1252px 561px #fff, 218px 52px #fff,
      1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff,
      137px 244px #fff, 939px 1922px #fff, 137px 1080px #fff,
      1757px 50px #fff, 904px 536px #fff, 1938px 1001px #fff,
      1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff,
      804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff,
      1216px 511px #fff, 1061px 1523px #fff, 97px 274px #fff,
      704px 1318px #fff, 52px 1872px #fff, 1962px 296px #fff,
      111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff,
      820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff,
      1286px 522px #fff, 955px 659px #fff, 428px 1805px #fff,
      237px 557px #fff, 1689px 1058px #fff, 636px 1882px #fff,
      1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff,
      302px 252px #fff, 827px 1765px #fff, 620px 123px #fff,
      207px 748px #fff, 1454px 1234px #fff, 1967px 1790px #fff,
      542px 33px #fff, 742px 1214px #fff, 255px 1402px #fff,
      74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff,
      534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff,
      1796px 120px #fff, 1409px 1263px #fff, 1627px 995px #fff,
      969px 710px #fff, 1674px 676px #fff, 1832px 759px #fff,
      1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff,
      886px 239px #fff, 778px 150px #fff, 1767px 430px #fff,
      765px 1259px #fff, 1189px 877px #fff, 444px 1629px #fff,
      1560px 324px #fff, 1952px 1097px #fff, 712px 1173px #fff,
      541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff,
      784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff,
      1821px 174px #fff, 221px 1795px #fff, 314px 739px #fff;
    animation: animStar 100s linear infinite;
  }
  #stars2:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
      1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff,
      1171px 563px #fff, 661px 1919px #fff, 1610px 44px #fff,
      1275px 140px #fff, 1208px 1802px #fff, 1473px 1587px #fff,
      11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff,
      1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff,
      417px 1188px #fff, 286px 561px #fff, 393px 1765px #fff,
      147px 881px #fff, 666px 1097px #fff, 1425px 1278px #fff,
      806px 156px #fff, 1252px 561px #fff, 218px 52px #fff,
      1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff,
      137px 244px #fff, 939px 1922px #fff, 137px 1080px #fff,
      1757px 50px #fff, 904px 536px #fff, 1938px 1001px #fff,
      1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff,
      804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff,
      1216px 511px #fff, 1061px 1523px #fff, 97px 274px #fff,
      704px 1318px #fff, 52px 1872px #fff, 1962px 296px #fff,
      111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff,
      820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff,
      1286px 522px #fff, 955px 659px #fff, 428px 1805px #fff,
      237px 557px #fff, 1689px 1058px #fff, 636px 1882px #fff,
      1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff,
      302px 252px #fff, 827px 1765px #fff, 620px 123px #fff,
      207px 748px #fff, 1454px 1234px #fff, 1967px 1790px #fff,
      542px 33px #fff, 742px 1214px #fff, 255px 1402px #fff,
      74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff,
      534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff,
      1796px 120px #fff, 1409px 1263px #fff, 1627px 995px #fff,
      969px 710px #fff, 1674px 676px #fff, 1832px 759px #fff,
      1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff,
      886px 239px #fff, 778px 150px #fff, 1767px 430px #fff,
      765px 1259px #fff, 1189px 877px #fff, 444px 1629px #fff,
      1560px 324px #fff, 1952px 1097px #fff, 712px 1173px #fff,
      541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff,
      784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff,
      1821px 174px #fff, 221px 1795px #fff, 314px 739px #fff;
  }

  #stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow:
      200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff,
      1888px 1547px #fff, 899px 1226px #fff, 1887px 580px #fff,
      1548px 1092px #fff, 1626px 689px #fff, 254px 1072px #fff,
      1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff,
      1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff,
      476px 876px #fff, 829px 1896px #fff, 1364px 1846px #fff,
      1507px 1120px #fff, 936px 1948px #fff, 1833px 832px #fff,
      1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff,
      1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff,
      264px 297px #fff, 811px 977px #fff, 1931px 673px #fff,
      1734px 978px #fff, 1772px 1567px #fff, 1197px 1400px #fff,
      764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff,
      1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff,
      235px 1082px #fff, 299px 1086px #fff, 1017px 1602px #fff,
      1950px 626px #fff, 1306px 132px #fff, 1358px 1618px #fff,
      1873px 1718px #fff, 1447px 940px #fff, 287px 1272px #fff;
    animation: animStar 150s linear infinite;
  }
  #stars3:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow:
      200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff,
      1888px 1547px #fff, 899px 1226px #fff, 1887px 580px #fff,
      1548px 1092px #fff, 1626px 689px #fff, 254px 1072px #fff,
      1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff,
      1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff,
      476px 876px #fff, 829px 1896px #fff, 1364px 1846px #fff,
      1507px 1120px #fff, 936px 1948px #fff, 1833px 832px #fff,
      1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff,
      1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff,
      264px 297px #fff, 811px 977px #fff, 1931px 673px #fff,
      1734px 978px #fff, 1772px 1567px #fff, 1197px 1400px #fff,
      764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff,
      1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff,
      235px 1082px #fff, 299px 1086px #fff, 1017px 1602px #fff,
      1950px 626px #fff, 1306px 132px #fff, 1358px 1618px #fff,
      1873px 1718px #fff, 1447px 940px #fff, 287px 1272px #fff;
  }

  @keyframes animStar {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-2000px);
    }
  }

  #stars4 {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      120px 320px #fff, 780px 1450px #fff, 1320px 580px #fff,
      450px 1120px #fff, 1680px 890px #fff, 230px 1780px #fff,
      950px 340px #fff, 1540px 1650px #fff, 680px 210px #fff,
      1100px 1390px #fff, 310px 960px #fff, 1860px 470px #fff,
      560px 1830px #fff, 1420px 130px #fff, 840px 1560px #fff,
      170px 680px #fff, 1250px 1910px #fff, 630px 420px #fff,
      1780px 1200px #fff, 390px 1650px #fff, 1050px 90px #fff,
      1600px 1480px #fff, 270px 530px #fff, 920px 1740px #fff,
      1470px 360px #fff, 540px 1080px #fff, 1830px 1590px #fff,
      110px 1350px #fff, 760px 620px #fff, 1390px 1870px #fff,
      480px 280px #fff, 1150px 810px #fff, 1720px 1120px #fff,
      340px 1490px #fff, 1560px 550px #fff, 660px 1680px #fff,
      1280px 230px #fff, 820px 1940px #fff, 190px 1150px #fff,
      1640px 720px #fff, 430px 380px #fff, 1070px 1620px #fff,
      1900px 280px #fff, 580px 930px #fff, 1350px 1540px #fff,
      250px 1870px #fff, 890px 490px #fff, 1510px 1310px #fff,
      520px 1580px #fff, 1190px 140px #fff, 710px 1260px #fff,
      1760px 840px #fff, 360px 470px #fff, 1030px 1790px #fff,
      1630px 310px #fff, 140px 1020px #fff, 850px 650px #fff,
      1440px 1440px #fff, 610px 160px #fff, 1220px 1680px #fff,
      780px 870px #fff, 1570px 1130px #fff, 410px 1360px #fff,
      1110px 540px #fff, 1840px 1760px #fff, 290px 740px #fff,
      960px 1490px #fff, 1660px 60px #fff, 500px 1210px #fff,
      1300px 890px #fff, 160px 1600px #fff, 870px 350px #fff,
      1480px 1710px #fff, 640px 580px #fff, 1160px 1050px #fff,
      1790px 430px #fff, 330px 1830px #fff, 1000px 260px #fff,
      1580px 1380px #fff, 220px 920px #fff, 940px 1160px #fff,
      1700px 640px #fff, 460px 1530px #fff, 1130px 300px #fff,
      1850px 1880px #fff, 570px 770px #fff, 1360px 1240px #fff,
      750px 50px #fff, 1500px 980px #fff, 380px 1710px #fff,
      1080px 430px #fff, 1670px 1560px #fff, 200px 860px #fff,
      1240px 620px #fff, 530px 1340px #fff, 1810px 190px #fff,
      690px 1100px #fff, 1410px 780px #fff, 300px 1460px #fff;
    animation: animStar 70s linear infinite;
  }
  #stars4:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      120px 320px #fff, 780px 1450px #fff, 1320px 580px #fff,
      450px 1120px #fff, 1680px 890px #fff, 230px 1780px #fff,
      950px 340px #fff, 1540px 1650px #fff, 680px 210px #fff,
      1100px 1390px #fff, 310px 960px #fff, 1860px 470px #fff,
      560px 1830px #fff, 1420px 130px #fff, 840px 1560px #fff,
      170px 680px #fff, 1250px 1910px #fff, 630px 420px #fff,
      1780px 1200px #fff, 390px 1650px #fff, 1050px 90px #fff,
      1600px 1480px #fff, 270px 530px #fff, 920px 1740px #fff,
      1470px 360px #fff, 540px 1080px #fff, 1830px 1590px #fff,
      110px 1350px #fff, 760px 620px #fff, 1390px 1870px #fff,
      480px 280px #fff, 1150px 810px #fff, 1720px 1120px #fff,
      340px 1490px #fff, 1560px 550px #fff, 660px 1680px #fff,
      1280px 230px #fff, 820px 1940px #fff, 190px 1150px #fff,
      1640px 720px #fff, 430px 380px #fff, 1070px 1620px #fff,
      1900px 280px #fff, 580px 930px #fff, 1350px 1540px #fff,
      250px 1870px #fff, 890px 490px #fff, 1510px 1310px #fff,
      520px 1580px #fff, 1190px 140px #fff, 710px 1260px #fff,
      1760px 840px #fff, 360px 470px #fff, 1030px 1790px #fff,
      1630px 310px #fff, 140px 1020px #fff, 850px 650px #fff,
      1440px 1440px #fff, 610px 160px #fff, 1220px 1680px #fff,
      780px 870px #fff, 1570px 1130px #fff, 410px 1360px #fff,
      1110px 540px #fff, 1840px 1760px #fff, 290px 740px #fff,
      960px 1490px #fff, 1660px 60px #fff, 500px 1210px #fff,
      1300px 890px #fff, 160px 1600px #fff, 870px 350px #fff,
      1480px 1710px #fff, 640px 580px #fff, 1160px 1050px #fff,
      1790px 430px #fff, 330px 1830px #fff, 1000px 260px #fff,
      1580px 1380px #fff, 220px 920px #fff, 940px 1160px #fff,
      1700px 640px #fff, 460px 1530px #fff, 1130px 300px #fff,
      1850px 1880px #fff, 570px 770px #fff, 1360px 1240px #fff,
      750px 50px #fff, 1500px 980px #fff, 380px 1710px #fff,
      1080px 430px #fff, 1670px 1560px #fff, 200px 860px #fff,
      1240px 620px #fff, 530px 1340px #fff, 1810px 190px #fff,
      690px 1100px #fff, 1410px 780px #fff, 300px 1460px #fff;
  }

  #stars5 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
      90px 540px rgba(255,255,255,0.8), 1750px 1320px rgba(255,255,255,0.6),
      430px 1800px rgba(255,255,255,0.7), 1200px 270px rgba(255,255,255,0.9),
      670px 960px rgba(255,255,255,0.5), 1560px 1680px rgba(255,255,255,0.8),
      310px 150px rgba(255,255,255,0.6), 1890px 830px rgba(255,255,255,0.7),
      820px 1470px rgba(255,255,255,0.9), 1380px 590px rgba(255,255,255,0.5),
      160px 1140px rgba(255,255,255,0.8), 1040px 1870px rgba(255,255,255,0.6),
      1680px 410px rgba(255,255,255,0.7), 550px 710px rgba(255,255,255,0.9),
      1270px 1540px rgba(255,255,255,0.5), 380px 1300px rgba(255,255,255,0.8),
      1810px 180px rgba(255,255,255,0.6), 750px 680px rgba(255,255,255,0.7),
      1450px 1190px rgba(255,255,255,0.9), 240px 1950px rgba(255,255,255,0.5),
      1130px 440px rgba(255,255,255,0.8), 600px 1620px rgba(255,255,255,0.6),
      1920px 1060px rgba(255,255,255,0.7), 470px 330px rgba(255,255,255,0.9),
      1340px 1750px rgba(255,255,255,0.5), 130px 870px rgba(255,255,255,0.8),
      990px 1380px rgba(255,255,255,0.6), 1630px 520px rgba(255,255,255,0.7),
      350px 1680px rgba(255,255,255,0.9), 1180px 90px rgba(255,255,255,0.5),
      720px 1230px rgba(255,255,255,0.8), 1860px 1490px rgba(255,255,255,0.6),
      510px 580px rgba(255,255,255,0.7), 1500px 1840px rgba(255,255,255,0.9),
      200px 420px rgba(255,255,255,0.5), 880px 1570px rgba(255,255,255,0.8),
      1710px 310px rgba(255,255,255,0.6), 450px 1040px rgba(255,255,255,0.7),
      1260px 760px rgba(255,255,255,0.9), 80px 1890px rgba(255,255,255,0.5);
    animation: animStar 120s linear infinite;
  }
  #stars5:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow:
      90px 540px rgba(255,255,255,0.8), 1750px 1320px rgba(255,255,255,0.6),
      430px 1800px rgba(255,255,255,0.7), 1200px 270px rgba(255,255,255,0.9),
      670px 960px rgba(255,255,255,0.5), 1560px 1680px rgba(255,255,255,0.8),
      310px 150px rgba(255,255,255,0.6), 1890px 830px rgba(255,255,255,0.7),
      820px 1470px rgba(255,255,255,0.9), 1380px 590px rgba(255,255,255,0.5),
      160px 1140px rgba(255,255,255,0.8), 1040px 1870px rgba(255,255,255,0.6),
      1680px 410px rgba(255,255,255,0.7), 550px 710px rgba(255,255,255,0.9),
      1270px 1540px rgba(255,255,255,0.5), 380px 1300px rgba(255,255,255,0.8),
      1810px 180px rgba(255,255,255,0.6), 750px 680px rgba(255,255,255,0.7),
      1450px 1190px rgba(255,255,255,0.9), 240px 1950px rgba(255,255,255,0.5),
      1130px 440px rgba(255,255,255,0.8), 600px 1620px rgba(255,255,255,0.6),
      1920px 1060px rgba(255,255,255,0.7), 470px 330px rgba(255,255,255,0.9),
      1340px 1750px rgba(255,255,255,0.5), 130px 870px rgba(255,255,255,0.8),
      990px 1380px rgba(255,255,255,0.6), 1630px 520px rgba(255,255,255,0.7),
      350px 1680px rgba(255,255,255,0.9), 1180px 90px rgba(255,255,255,0.5),
      720px 1230px rgba(255,255,255,0.8), 1860px 1490px rgba(255,255,255,0.6),
      510px 580px rgba(255,255,255,0.7), 1500px 1840px rgba(255,255,255,0.9),
      200px 420px rgba(255,255,255,0.5), 880px 1570px rgba(255,255,255,0.8),
      1710px 310px rgba(255,255,255,0.6), 450px 1040px rgba(255,255,255,0.7),
      1260px 760px rgba(255,255,255,0.9), 80px 1890px rgba(255,255,255,0.5);
  }
`;

export default StarryBackground;
