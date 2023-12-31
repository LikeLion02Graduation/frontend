import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import TopBar from "../../components/_common/TopBar";
import { WhiteBox, MainWebBox, Line2, Wrapper } from "../../components/_common/CommonExport";
import { MapTitleText } from "../../components/mymap/MapTitleText";
import ShareModal from "../../components/mymap/ShareModal";

const SharePage = () => {
  const navigate = useNavigate();
  // const mapData = useSelector((state) => state.mapmaking);

  const [mapData, setMapData] = useState({
    id: 1, // MAP 아이디
    name: "부산 갈거야",
    location: "부산",
    img: "[이미지url]",
    description: "2023 12 30 떠난다 추천 부탁해~~",
    created_at: "2023-11-11 12:12:11",
    hashtag: ["카페", "국밥"],
    user: {
      id: 1,
      nickname: "서연",
    },
    do_buy: true,
    recommend: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareBtnClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <TopBar navBtnOn={true} titleText={"Making"} />
      <Wrapper>
        <WhiteBox text={"Q. 스토리로 공유로 더 많은 추천을 받아보는 건 어때요"} />
        <Line2 />

        <MainWebBox>
          <TitleContainer>
            <MapTitleText mapData={mapData} />
            <MapNameText>{mapData.name}</MapNameText>
          </TitleContainer>
          <TagContainer>
            {mapData.hashtag.map((item) => (
              <span key={item}>#{item}</span>
            ))}
          </TagContainer>
          <Description>
            <div>{mapData.description}</div>
          </Description>
        </MainWebBox>
        <WhiteBtn>
          <div onClick={handleShareBtnClick}>Share to Instagram</div>
          <div onClick={() => navigate("/")}>Skip</div>
        </WhiteBtn>
      </Wrapper>
      {isModalOpen && <ShareModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default SharePage;
const TitleContainer = styled.div`
  margin-top: 43px;
  margin-bottom: 21px;
  padding-left: 25px;
  padding-right: 21px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const MapNameText = styled.div`
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 1.5px;
`;

const TagContainer = styled.div`
  padding-left: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  gap: 38px;
  background: var(--yellow);
  border-top: 1.5px solid var(--black1);
  border-bottom: 1.5px solid var(--black1);

  color: var(--black2);
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-weight: 500;
  line-height: 145%; /* 20.3px */
  letter-spacing: 1.4px;
`;

const Description = styled.div`
  margin-top: 29px;
  margin-bottom: 47px;
  padding-left: 25px;
  box-sizing: border-box;

  font-size: 15px;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
  letter-spacing: 0.75px;
`;

const WhiteBtn = styled.div`
  position: fixed;
  bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 13px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 342.222px;
    height: 55px;
    flex-shrink: 0;

    color: var(--black1);
    text-align: center;
    font-family: "Hack Regular";
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.75px;
    border: 1.5px solid var(--black1);
    background: var(--white);
    box-shadow: 0px 0px 6.97764px 0.99681px rgba(0, 0, 0, 0.03);
    cursor: pointer;
  }

  @media (max-width: 393px) {
    width: calc(100% - 50px);
  }

  @media (max-height: 852px) {
    position: static;
    margin-top: 49px;
    margin-bottom: 28px;
  }
`;
