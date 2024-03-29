import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WhiteBox = ({ text }) => {
  return (
    <Box>
      <span>{text}</span>
    </Box>
  );
};

const MapNameBox = ({ loading, place, user }) => {
  return <Box>{loading ? <span></span> : <span>{`<${place}에 가는 ${user}의 지도>`}</span>}</Box>;
};

const YellowBox = ({ text, font, weight }) => {
  return (
    <Box2 font={font} weight={weight}>
      <div>{text}</div>
    </Box2>
  );
};

const Line1 = () => {
  return <LineStyle style={{ background: "var(--black1)" }} />;
};

const Line2 = () => {
  return <LineStyle style={{ background: "var(--black2)" }} />;
};

const NextBtnBlack = ({ addClickHandler, where, text, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (where) {
      navigate(where);
    }

    if (addClickHandler) {
      addClickHandler();
    }
  };

  return (
    <BoxB onClick={handleClick} style={{ bottom: number }}>
      {text ? text : "Next"}
    </BoxB>
  );
};

const NextBtnWhite = ({ addClickHandler, where, text, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (where) {
      navigate(where);
    }

    if (addClickHandler) {
      addClickHandler();
    }
  };

  return (
    <BoxW onClick={handleClick} style={{ bottom: number }}>
      {text}
    </BoxW>
  );
};

const LongBtnBlack = ({ where, text }) => {
  const navigate = useNavigate();
  return (
    <LongBtnB
      onClick={() => {
        navigate(where);
      }}
    >
      {text}
    </LongBtnB>
  );
};

const MainWebBox = ({ children, id }) => {
  return (
    <MainBox id={id}>
      <TopBlackBar>
        <WhiteSmallBox />
        <WhiteSmallBox />
      </TopBlackBar>
      {children}
    </MainBox>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 106px);
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--white);
  font-family: "Hack Regular";
`;

export { WhiteBox, MapNameBox, YellowBox, Line1, Line2, NextBtnBlack, NextBtnWhite, LongBtnBlack, MainWebBox, Wrapper };

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 61px;
  flex-shrink: 0;

  span {
    color: var(--Black2);
    text-align: center;
    font-family: "Apple SD Gothic Neo";
    font-size: 14px;
    font-weight: 600;
    line-height: 145%; /* 20.3px */
    letter-spacing: 1.4px;
  }
`;

const Box2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 61px;
  flex-shrink: 0;
  background-color: var(--yellow);

  color: var(--Black2);
  font-family: ${(props) => props.font || "Apple SD Gothic Neo"};
  font-size: 14px;
  font-weight: ${(props) => props.weight || "600"};
  line-height: 145%; /* 20.3px */
  letter-spacing: 1.4px;

  div {
    width: 390px;
    padding-left: 30px;
    box-sizing: border-box;
  }
`;

const BoxB = styled.div`
  position: fixed;
  bottom: 81px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 342.222px;
  height: 55px;
  flex-shrink: 0;

  color: var(--white);
  text-align: center;
  font-family: "Hack Regular";
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.75px;
  border: 1.5px solid var(--black1);
  background: var(--black1);
  box-shadow: 0px 0px 6.97764px 0.99681px rgba(0, 0, 0, 0.03);
  cursor: pointer;

  @media (max-width: 393px) {
    width: calc(100% - 50px);
  }
`;

const BoxW = styled.div`
  position: fixed;
  bottom: 81px;
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

  @media (max-width: 393px) {
    width: calc(100% - 50px);
  }
`;

const LongBtnB = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 55px;
  flex-shrink: 0;
  background-color: var(--black1);
  box-shadow: 0px 0px 6.97764px 0.99681px rgba(0, 0, 0, 0.03);

  color: var(--white);
  font-family: "Hack Regular";
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.75px;
`;

const LineStyle = styled.div`
  width: 100%;
  height: 1.5px;
  flex-shrink: 0;
`;

const MainBox = styled.div`
  margin-top: 49px;
  margin-bottom: 22px;
  width: 319px;
  border: 1px solid var(--black1);
  background-color: #f9f9f9;

  @media (max-width: 393px) {
    width: calc(100% - 60px);
  }
`;

const TopBlackBar = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 37px;
  flex-shrink: 0;
  background: var(--black1);
`;

const WhiteSmallBox = styled.div`
  margin: 7px 7px 7px 0;
  width: 23px;
  height: 23px;
  flex-shrink: 0;
  background: var(--white);
`;
