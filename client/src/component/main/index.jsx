import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import Container from "../common/container";
import { admDelete, needDownLoad } from "../../actions/adm_action";
import { FontAwsome } from "../common/fontawsome";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/boardSlice";
import Slider2 from "../common/slider/slider";
import { _Condtion } from "../../store/menuSlice";
import D3C from "../common/d3/d3";
import AdminSide from "../common/adminSide";
import Canvas from "../common/canvas/canvas";
import { _GetLike } from "../../store/likeSlice";
import { Container2 } from "../common/commonUi";
function Main() {
    const store = useSelector(state => state);
    const [menu, setMenu] = useState(store.menuInfo.data);
    const [userInfo, setUserInfo] = useState({});
    const dispatch = useDispatch();
    const section1 = useRef(null);
    const section2 = useRef(null);
    const [winSize, setWinSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    let body;

    useEffect(() => {
        setUserInfo(store.userInfo.data)
        console.log(store);

    }, [store])


    useLayoutEffect(() => {
        body = {
            url: '/setting/like',
        }
        dispatch(_GetLike(body))

        // Canvas.box({
        //     target: section1.current,
        //     coordinate: [['-42vw', "-30%"]], // 위치
        //     width: ["55%"], // width 
        //     height: ["95%"], // height
        //     color: ['rgba(23,66,255,0.3)'],
        //     addStyle: [`
        //         transform:rotate(45deg);
        //         border-radius:20px;
        //     `],
        //     animation: ['big']
        // });

        // Canvas.circle({
        //     target: section1.current,
        //     coordinate: ["65%", "-6%"],
        //     width: 300,
        //     height: 300,
        //     color: 'rgba(255,0,125,0.2)'
        // })
        // Canvas.circle({
        //     target: section1.current,
        //     coordinate: [["60%", '40%'], ["75%", "60%"], ["90%", "40%"]],
        //     width: [150, 200, 250],
        //     height: [150, 200, 250],
        //     color: ['rgba(44,35,255,0.6)', 'rgba(23,66,255,0.3)', 'rgba(50,255,100,0.5)']ㄱ
        // })

        body = {}

        needDownLoad(body).payload
            .then(res => {
                if (!res.Download)
                    window.location.href = '/download?task=0';
            });


        const handleResize = () => {
            setWinSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
        return (() => {
            window.removeEventListener('reisze', () => null)
        })
    }, [])

    let ContainerStyle = {
        width: '100%',
        marginLeft: 0
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
    }

    const canvasStyle = {
        position: 'absolute',
        // border: '1px solid #000',
        left: '50%',
        top: '50%',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%,-50%)',
    }
    const section5Data = [
        [
            'React로 portFolio 제작',
            'PHP(그누보드)로 홈페이지 제작 및 유지보수 (경력: 1년)',
            'Sass(css) 관련 프레임워크 사용',
            'Vanilla Javascript 선호'
        ],
        [
            'NodeJs, Java, Python, PHP, mySql',
            'NodeJs 로그인, 게시판, 회원가입 기능 직접 구현',
            'HeidiSQL을 통한 DB 조작',
            '숙련도는 높지 않음.'
        ],
        [
            'Bixby AI QA (경력: 2년)',
            'Bixby AI Localization(ko-KR)'
        ]
    ]
    return (
        <Container2 info={{ style: ContainerStyle }}>
            <Section index='1' useRef={section1}>
                {/* <canvas ref={canvasRef} style={canvasStyle}></canvas> */}
                <div className="aboutMe">
                    <div className="position">
                        <h1>
                            Section1
                        </h1>
                        <p>
                            현재 윈도우 넓이 : {winSize.width} <br />
                            현재 윈도우 높이 : {winSize.height} <br />
                        </p>
                    </div>
                </div>
                <div className="gear">
                    <div></div>
                </div>
            </Section>
            <Section index='4'>
                <Slider2 {...settings}>
                    <List>
                        <ImgBox imgSrc={'html.png'}>
                            <h3>HTML</h3>
                            <a href="https://ko.wikipedia.org/wiki/HTML"></a>
                        </ImgBox>
                        <ImgBox imgSrc={'css.png'}>
                            <h3>CSS3</h3>
                            <a href="https://ko.wikipedia.org/wiki/CSS"></a>
                        </ImgBox>
                        <ImgBox imgSrc={'js.png'}>
                            <h3>Javascript</h3>
                        </ImgBox>
                        <ImgBox imgSrc={'nodejs.png'}>
                            <h3>
                                NodeJs
                            </h3>
                            <a href="https://ko.wikipedia.org/wiki/Node.js"></a>
                        </ImgBox>
                    </List>
                    <List>
                        <ImgBox imgSrc={'react.png'}>
                            <h3>React</h3>
                            <a href="https://ko.wikipedia.org/wiki/%EB%A6%AC%EC%95%A1%ED%8A%B8_(%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)"></a>
                        </ImgBox>
                        <ImgBox imgSrc={'mysql.png'}>
                            <h3>Mysql</h3>
                        </ImgBox>
                        <ImgBox imgSrc={'sass.png'}>
                            <h3>
                                Sass
                            </h3>
                        </ImgBox>
                        <ImgBox imgSrc={'java.png'}>
                            <h3>Java</h3>
                        </ImgBox>
                    </List>

                </Slider2>
            </Section>

            {/* <Section useRef={section2} index='2' name="Mastery">
                <D3C
                    data={[
                        { label: "HTML ", value: 95, fill: '' },
                        { label: "CSS", value: 95, fill: '' },
                        { label: 'SASS', value: 80, fill: '' },
                        { label: "Javascript", value: 85, fill: '' },
                        { label: "React", value: 80, fill: '' },
                        { label: "NodeJS", value: 70, fill: '' },
                        { label: 'mysql', value: 70, fill: '' },
                        { label: 'JAVA', value: 50 },
                        { label: 'PHP', value: 50 }
                    ]}
                    width={winSize.width}
                    height={450}
                ></D3C>
            </Section> */}

            <Section index="5" name="Career">
                {/* <ImgBox imgSrc="gear.png" className="gear"></ImgBox> */}

                <List
                    type="1"
                    img_position="back"
                    name="프론트앤드"
                    img="frontend.jpg"
                    img_alt='<a href="https://kr.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-and-testing-it-profession-isolated-flat-vector-illustration_28158111.htm#query=%ED%94%84%EB%A1%A0%ED%8A%B8%EC%95%A4%EB%93%9C%20%EA%B0%9C%EB%B0%9C&position=0&from_view=search&track=country_rows_v1">작가 vector4stock</a> 출처 Freepik'
                    data={section5Data[0]}
                />
                <List
                    type='1'
                    name='백앤드'
                    img_position='front'
                    img='backend.jpg'
                    img_alt='<a href="https://kr.freepik.com/free-vector/back-end-typographic-header-software-development-process-website-interface-design-improvement-programming-and-coding-it-profession-isolated-flat-vector-illustration_25579589.htm#query=%EB%B0%B1%EC%95%A4%EB%93%9C%20%EA%B0%9C%EB%B0%9C&position=2&from_view=search&track=country_rows_v1">작가 vector4stock</a> 출처 Freepik'
                    data={section5Data[1]}
                />
                <List
                    type='1'
                    img_position="back"
                    name="Bixby"
                    img='bixby.jpg'
                    img_alt=""
                    data={section5Data[2]}
                />
            </Section>

            <Likes background_image={'../img/banner1.jpg'}
                like={store.likeInfo.data}
                userInfo={userInfo}
                from={
                    <a href="https://kr.freepik.com/free-photo/textured-mulberry-paper_4100976.htm#query=%EB%B2%BD%EC%A7%80&position=25&from_view=search&track=sph">작가 rawpixel.com 출처 Freepik</a>
                }>
                LIKE
            </Likes>

            <AdminSide />
        </Container2 >
    )
}

function List({ children, type, name, img_position, img, img_alt, data = [] }) {

    if (type === "1") children = (
        <div className="flex-box content-box">
            {
                img_position === 'front' ?
                    <img className="frontImg" src={`../img/${img}`} alt={img_alt} />
                    : null
            }
            <div className="text-box">
                <h3>
                    {name}
                </h3>
                <ul>
                    {
                        data.map((el, index) => {
                            return (
                                <li key={index}>
                                    <p>
                                        {el}
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
                {children}
            </div>
            {
                img_position === 'back' ?
                    <img className="backImg" src={`../img/${img}`} alt="" /> : null
            }
        </div>
    )

    return (
        <div className="list">
            <div className="flex-box">
                {children}
            </div>
        </div>
    )
}

function Section(props) {
    return (
        <section ref={props.useRef} id={`section${props.index}`}>
            <article className="section-pad">
                {
                    props.name !== undefined ?
                        <h2>
                            {props.name}
                        </h2> : null
                }
                {props.children}
            </article>
        </section>
    )
}

const ImgBox = (props) => {
    const img = props.imgSrc;
    const img_class = props.imgSrc.split('.')[0]
    return (
        <div className={`imgBox ${img_class}`}>
            <img src={`../img/${img}`} alt={props.alt} />
            {props.children}
        </div>
    )
}

const Likes = (props) => {
    const dispatch = useDispatch();
    const likes = props.like
    const banerStyle = {
        backgroundImage: `url('${props.background_image}')`,
        backgroundPosition: 'center',
        backgroundRepeact: "no-repeact",
        backgroundSize: '100%',
        backgroundAttachment: "fixed"
    }
    const fontStyle = {
        ...props.fs
    }
    return (
        <div className="banner" style={banerStyle}>
            <h2 style={
                fontStyle
            }>
                {props.children}
            </h2>
            <ul className="like">
                {
                    likes !== undefined ?
                        likes.map((el, i) => {
                            const clickHandle = async (event) => {
                                if (props.userInfo.num === undefined) return alert('로그인 이후 이용해주세요')
                                event.preventDefault();
                                let click = false
                                if (event.type === 'click') click = true;

                                let body = {
                                    url: '/setting/like',
                                    hit: el.hit,
                                    type: el.type,
                                    userNum: props.userInfo.num,
                                    click
                                }
                                dispatch(_GetLike(body));
                            }
                            return (
                                <li key={i}>
                                    <a href="#" className={el.type} onClick={clickHandle}>
                                        {el.icon}
                                    </a>
                                    <p className="like_hit">
                                        {el.hit}
                                    </p>

                                </li>
                            )
                        }) : null
                }
            </ul>
            <div className="disNo">
                {props.from}
            </div>
        </div>
    )
}


export default Main;