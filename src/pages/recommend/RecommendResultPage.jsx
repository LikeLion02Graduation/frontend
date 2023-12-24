import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import TopBar from "../../components/_common/TopBar";
import { Line2, Wrapper, YellowBox } from "../../components/_common/CommonExport";

const { kakao } = window;

const RecommendResultPage = ({ searchText, setSearchText }) => {
  const navigate = useNavigate();
  const [mapState, setMapState] = useState({
    isSelected: false,
    reseultPlaces: [],
    selectedPlace: [],
  });

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow();
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchText, placesSearchCB);

    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);

        setMapState((prevState) => ({ ...prevState, reseultPlaces: data }));
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
      infowindow.open(map, marker);
    }

    displayMarker(mapState.selectedPlace);
    console.log(mapState.reseultPlaces);
  }, [searchText, mapState.selectedPlace]);

  function savePlace(data) {
    setMapState({ isSelected: true, reseultPlaces: mapState.reseultPlaces, selectedPlace: data });
    console.log(data);
  }

  function initSelectPlace() {
    setSearchText("");
    setMapState({ isSelected: false, reseultPlaces: [], selectedPlace: [] });
  }

  function selectPlace() {
    initSelectPlace();
    navigate("/recommend/main");
  }

  function notSelectPlace() {
    initSelectPlace();
    navigate("/recommend/search");
  }

  return (
    <Fix>
      <TopBar navBtnOn={true} titleText="Result" />
      <Wrapper>
        <SearchAgain>탭해서 [다시] 장소 검색하기. . .</SearchAgain>
        <Line2 />
        <MapContainer id="myMap" mapState={mapState} />
        <YellowBox text="이 장소가 맞나요?" font={"Hack Regular"} weight={"400"} />
        <Buttons>
          <div onClick={selectPlace} style={{ background: "var(--black1)", color: "var(--white)" }}>
            y
          </div>
          <div onClick={notSelectPlace} style={{ background: "var(--white)", color: "var(--black1)" }}>
            N
          </div>
        </Buttons>
        {!mapState.isSelected && (
          <ResultList id="result-list">
            {mapState.reseultPlaces.map((item, i) => (
              <>
                <ListBox key={i} onClick={() => savePlace(item)}>
                  <Index>{i + 1}</Index>
                  <Info>
                    <div>{item.place_name}</div>
                    {item.road_address_name && <div>{item.road_address_name}</div>}
                    <div style={{ opacity: "0.3" }}>[지번] {item.address_name}</div>
                    <div style={{ opacity: "0.3", fontFamily: "Hack Regular", fontWeight: "400" }}>{item.phone}</div>
                  </Info>
                </ListBox>
                <Line2 />
              </>
            ))}
          </ResultList>
        )}
      </Wrapper>
    </Fix>
  );
};

export default RecommendResultPage;

const Fix = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
`;

const SearchAgain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 61px;
  padding-left: 30px;
  box-sizing: border-box;

  color: var(--Black2);
  font-size: 14px;
  font-weight: 400;
  line-height: 145%; /* 20.3px */
  letter-spacing: 1.4px;
  opacity: 0.3;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 393px;
  height: 145px;
  padding-top: 31px;
  box-sizing: border-box;

  color: var(--black3);
  font-family: Apple SD Gothic Neo;
  font-size: 14px;
  font-weight: 600;
  line-height: 145%; /* 20.3px */
  letter-spacing: 1.4px;
`;

const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 29px 0px 31px;
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  border: 1.2px solid var(--black1);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MapContainer = styled.div`
  display: ${(props) => (props.mapState.isSelected ? "flex" : "none")};
  width: 393px;
  height: 474px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 142px;
    height: 41px;
    flex-shrink: 0;
    border: 1.5px solid var(--black1);
    box-shadow: 0px 0px 6.97764px 0.99681px rgba(0, 0, 0, 0.03);
  }
`;

const ResultList = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: var(--white);
`;
