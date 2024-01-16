import { useEffect } from "react";
import { Container2 } from "../common/commonUi";
import { faChild } from "@fortawesome/free-solid-svg-icons";

export default function About({ }) {
    let info = {
        className: 'about'
    }
    useEffect(() => {

    }, [])
    return (
        <Container2 info={info}>
            <div className="about-banner">
                <h3>ABOUT</h3>
                {/* <a href="https://kr.freepik.com/free-photo/contemporary-office_5398660.htm#query=%EC%82%AC%EB%AC%B4%EC%8B%A4%20%EB%B0%B0%EA%B2%BD&position=19&from_view=keyword&track=ais&uuid=e0606842-4b19-4aa2-bfd9-37a6e0767306">작가 pressfoto</a> 출처 Freepik */}
            </div>
            <section>
                <Article title="자기소개" sizeFee={true} className="greetings">
                    <p>
                        안녕하세요 홈페이지 주인 겸 개발자 김현묵입니다. <br />
                        저 자신을 소개하는 사이트를 하나 만들어 보고 싶어 포토폴리오 겸 제작하게 됐습니다. <br />
                        이 페이지는 저의 대한 간단한 소개 및 사이트를 제작하며 어떤 생각으로 구현했는지를  <br />
                        적어볼려고 합니다. <br /> <br />

                        저는 먼저 웹 개발자를 시작한 계기는 우연입니다. 그냥 집에서 뭐하고 먹고살지 생각하다가 <br />
                        국비지원교육을 신청하게 되었고 어떨결의 개발자를 시작하게 되었습니다. <br />
                        학원에서는 나름 처음 배우는 사람치곤 잘하는 편이었습니다. 컴퓨터쪽으로 평소에도 관심이 많았던 <br />
                        탓인가 처음 시작에는 프론트엔드를 주로 배웠지만 백엔드 관련 PHP를 간단히 배워 서버를 구축하는 법을 <br />
                        배웠습니다. <br />
                        그렇게 학원을 졸업 후 빠르게 취업을 하게되었습니다. PHP를 이용해 웹 개발을 하는 곳 이였고 <br />
                        실제 업무 를 시작하고 나서 실전은 역시 다르구나 하고 많은 것을 배웠습니다. 기초 적인 코딩에 개념 <br />
                        부터 시작해서 유지 보수 특히 이 유지 보수에대한 생각을 많이 하게 되었습니다. <br />
                        주된 업무가 유지 보수 였기 때문입니다. 내가 만든 코드가 아닌 남이 만든 코드를 보고 수정 해야하는 일은 <br />
                        쉽지 않은 일이 였고 그 때부터 프레임 워크에 관심을 가지고 react, vue 를 찾아 공부하기 시작했습니다. <br />
                        처음엔 엉뚱한 생각도 많이 했습니다. PHP와 react 를 접목해서 해보고 싶어서 여러 도전도 해봤습니다. <br />
                        하지만 비효율적인걸 알았고 포기한 기억이 있습니다. 코딩을 하면서 여러가지를 해보고 싶었고 <br />
                        그렇게 저는 다른 도전을 해보고 싶어 다니던 회사를 관두고 다시 새로운 일을 찾았습니다.  <br />
                        일을 관두고 bixby 관련 업무에 들어가게 되었고 계약직이지만 AI관련해 경험을 해보고 좋을거 같아 지원하게되었고 <br />
                        일을 시작했습니다. 회사를 다니면서 여러 코드를 많이 보고 협업하는 과정 git에 대한 지식 등 배울 점이 많았고 <br />
                        실제로 많이 배웠습니다. 일을 다니면서 틈틈히 react와 node를 공부했고 마스터했다고는 할 순 없지만 혼자 사이트를 <br />
                        구축할 만큼의 숙련도는 된다고 생각합니다. <br />
                        중간에 자바 공부 및 파이썬도 했지만 일단 이 사이트를 완성하고 싶어 react와 node에 집중 했습니다. <br />
                        아 참고로 이 사이트는 저 혼자 제작했습니다. 서버와 클라이언트 둘 다...... <br />
                        아직 부족한 점도 많고 모르는 것도 많습니다. 하지만 이 홈페이지도 처음엔 아무 것도 없던 백지 였지만<br />
                        지금은 어느 정도 사이트의 모습을 하고 있습니다. 홈페이지를 채워나가며 저도 같이 성장해가며 개발자 다운 <br />
                        모습으로 변해가는 모습을 보여드리겠습니다.
                    </p>
                </Article>
            </section>
        </Container2>
    )

}

function Article({ title, className, children, sizeFee }) {
    const Style = {
        height: sizeFee ? null : window.innerHeight
    }
    return (
        <article className={className} style={Style}>
            <h3>{title}</h3>
            {children}
        </article>
    )
}