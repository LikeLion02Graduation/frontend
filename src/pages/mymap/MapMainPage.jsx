import React, { useState } from "react";
import { styled } from "styled-components";

import TopBar from "../../components/_common/TopBar";

import triangle from "../../assets/images/triangle.svg";
import { Line1 } from "../../components/_common/CommonExport";

const MapMainPage = () => {
  // 임시 코드
  const [isSelected, setSelected] = useState(true);

  return (
    <>
      <TopBar navBtnOn={true} titleText="부산에 가자" />
      <Wrapper>
        <TitleContainer>
          <Title>부산에 가자</Title>
          <MapInfo>
            <div>
              얘들아 난 국밥은 항정살로 만얘들아 난 국밥은 항정살로 만든 돼지고기가 들어간.. 국밥이여야만 해든
              돼지고기가 들어간.. 국밥이여야만 해
            </div>
          </MapInfo>
        </TitleContainer>

        <TagContainer>
          <WTag>
            <div>edit</div>
            <div>link</div>
            <div>edit</div>
          </WTag>
          <YTag>
            <div>#cafe</div>
            <div>#food</div>
          </YTag>
        </TagContainer>

        <ListTitle>recommend (6)</ListTitle>
        <Line1 />
        {isSelected ? (
          <ListContainer>
            <ListBox>
              <Profile>이미지</Profile>
              <Content>
                <span>From. 핑핑이</span>
                <span>
                  <span>여기 안가면 평생 후회하게 될 것입니다.</span>
                  <img src={triangle} alt="go to" />
                </span>
                <span>23.11.19 03:06</span>
              </Content>
            </ListBox>
          </ListContainer>
        ) : (
          <BlankContainer>
            아래 회색깔 검색 바를 탭해서 <br />
            남기고 싶은 장소를 픽해주세요
          </BlankContainer>
        )}

        <BlackBoxBtn>all recommend</BlackBoxBtn>
      </Wrapper>
    </>
  );
};

export default MapMainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 106px);
  background: var(--white);
  font-family: "Hack Regular";
`;

const TitleContainer = styled.div`
  margin-top: 44px;
  margin-bottom: 20px;
  padding-left: 31px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 393px;
  height: 87px;
`;

const Title = styled.div`
  width: 168px;
  height: 87px;
  flex-shrink: 0;

  font-feature-settings: "clig" off, "liga" off;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 5px;
`;

const MapInfo = styled.div`
  width: 174px;
  height: 87px;
  border: 1.5px solid var(--black1);
  background: var(--yellow);
  padding: 13px 12px 10px 16px;
  box-sizing: border-box;

  div {
    display: -webkit-box;
    white-space: normal;
    overflow: hidden;
    -webkit-line-clamp: 3; /*보여줄 줄의 수를 정함*/
    -webkit-box-orient: vertical; /*box의 배열 방향을 정함*/

    color: var(--black2);
    font-size: 14px;
    font-weight: 400;
    line-height: 145%; /* 20.3px */
    letter-spacing: 1.4px;
  }
`;

const TagContainer = styled.div`
  padding-left: 31px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 393px;
  gap: 12.5px;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const WTag = styled.div`
  display: flex;
  flex-direction: row;

  div {
    width: 86px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--white); //나중에 이미지로 바꾸기
  }
`;

const YTag = styled.div`
  display: flex;
  flex-direction: row;

  div {
    width: 86px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 30px;
    border: 1.5px solid var(--black1);
    background: var(--yellow);
  }
`;

const ListTitle = styled.div`
  margin-top: 44px;
  margin-bottom: 12px;
  padding-left: 31px;
  box-sizing: border-box;
  width: 390px;

  font-feature-settings: "clig" off, "liga" off;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 5px;
`;

const ListContainer = styled.div`
  margin: 12px 22px 10px 21px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 497px);
  overflow: scroll;
`;

const ListBox = styled.div`
  padding: 9px 12px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  font-family: Apple SD Gothic Neo;
`;

const Profile = styled.div`
  width: 69px;
  height: 69px;
  border: 1.5px solid var(--black1);
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  color: var(--black2);

  span:nth-child(1) {
    color: var(--black1);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 5px;
  }

  span:nth-child(2) {
    display: flex;
    flex-direction: row;
    width: 234px;
  }

  span:nth-child(2) > span {
    margin-right: 12px;
    max-width: 207px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.4px;
  }

  span:nth-child(3) {
    font-family: "Hack Regular";
    font-size: 12px;
    font-weight: 400;
  }
`;

const BlankContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 410.5px; //임시

  color: var(--black2);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 145%; /* 20.3px */
  letter-spacing: 1.4px;
  opacity: 0.3;
`;

const BlackBoxBtn = styled.div`
  position: fixed;
  bottom: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 342.222px;
  height: 55px;
  flex-shrink: 0;
  border: 1.5px solid var(--black1);
  background: var(--black1);
  box-shadow: 0px 0px 6.978px 0.997px rgba(0, 0, 0, 0.03);

  color: var(--white);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.75px;
`;
