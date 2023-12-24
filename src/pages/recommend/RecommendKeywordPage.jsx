import React, { useState } from "react";
import { styled } from "styled-components";

import TopBar from "../../components/_common/TopBar";
import { WhiteBox } from "../../components/_common/CommonExport";

const RecommendKeywordPage = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordClick = (clickedKeyword) => {
    if (selectedKeywords.includes(clickedKeyword)) {
      setSelectedKeywords((prevKeywords) => prevKeywords.filter((keyword) => keyword !== clickedKeyword));
    } else {
      setSelectedKeywords((prevKeywords) => [...prevKeywords, clickedKeyword]);
    }

    console.log(selectedKeywords);
  };

  const keywords = ["맛집", "명소", "카페", "자연", "산책", "빵", "국밥", "브런치"];

  return (
    <>
      <TopBar navBtnOn={true} titleText="giving" />
      <Wrapper>
        <WhiteBox text="Q. 지금 요 추천을 설명할 수 있는 키워드! 를 알려주세요" />
        <KeywordGrid>
          {keywords.map((keyword, index) => (
            <Keyword
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              selected={selectedKeywords.includes(keyword)}
              className={index % 2 === 0 ? "left-column" : "right-column"}
            >
              <span>#{keyword}</span>
              {/* {index % 2 === 0 ? (
                <span className="left-column">#{keyword}</span>
              ) : (
                <span className="right-column">#{keyword}</span>
              )} */}
            </Keyword>
          ))}
        </KeywordGrid>
        <NextBox>Next</NextBox>
      </Wrapper>
    </>
  );
};

export default RecommendKeywordPage;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 106px);
  background: var(--white);
  font-family: "Hack Regular";
`;

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  background-color: var(--black1);
  gap: 1.5px;
  padding: 1.5px 0;

  color: var(--black2);
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-weight: 500;
  line-height: 145%; /* 20.3px */
  letter-spacing: 1.4px;

  .left-column {
    display: flex;
    justify-content: end;
    padding-right: 81px;
    box-sizing: border-box;
  }

  .right-column {
    padding-left: 81px;
    box-sizing: border-box;
  }
`;

const Keyword = styled.div`
  display: flex;
  align-items: center;
  height: 61px;
  background-color: ${(props) => (props.selected ? "var(--yellow)" : "var(--white)")};
`;

const NextBox = styled.div`
  position: absolute;
  bottom: 81px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 55px;
  background-color: var(--black1);
  box-shadow: 0px 0px 6.97764px 0.99681px rgba(0, 0, 0, 0.03);

  color: var(--white);
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.75px;
`;
