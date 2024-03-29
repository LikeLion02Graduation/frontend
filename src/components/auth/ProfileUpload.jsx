import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//api
import { PostSignup } from "../../api/user";

const ProfileUpload = () => {
  const navigate = useNavigate();
  const signupInfo = useSelector((state) => state.signup);

  //프로필 사진 설정
  const [imgURL, setImgURL] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      try {
        const imageUrl = URL.createObjectURL(imageFile);
        setSelectedImg(imageFile);
        setImgURL(imageUrl);
        console.log("Selected Image content:", imageFile);
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };
  //닉네임 설정
  const [username, setUsername] = useState("");

  //가입 완료 함수
  const signup = () => {
    if (username.trim() === "") {
      alert("닉네임을 입력해주세요.");
    } else {
      PostSignup(signupInfo.user_id, signupInfo.password, username, selectedImg, navigate);
    }
  };

  return (
    <>
      <Profile>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {imgURL ? (
          <ProfileImg src={imgURL} alt="Preview" />
        ) : (
          <div>
            클릭해서 <br />
            프로필 사진 수정
          </div>
        )}
      </Profile>
      <Container>
        <span>사용할 닉네임을 입력하세요.</span>
        <input
          type="text"
          placeholder="닉네임 입력"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
      </Container>
      <LongBtn onClick={signup}>가입 완료</LongBtn>
    </>
  );
};

export default ProfileUpload;

const Container = styled.div`
  margin-top: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;

  span {
    margin-bottom: 14px;
    width: 337px;

    color: var(--black1);
    font-family: "Hack Regular";
    font-size: 14px;
    font-weight: 400;

    @media (max-width: 393px) {
      width: calc(100% - 62px);
    }
  }

  input {
    width: 100%;
    height: 61px;
    flex-shrink: 0;
    border: 1.5px solid var(--black1);
    background: var(--gray);

    color: var(--black3);
    text-align: center;
    font-family: "Hack Regular";
    font-size: 14px;
    font-weight: 400;
    line-height: 145%; /* 20.3px */
    letter-spacing: 1.4px;

    &::placeholder {
      opacity: 0.4;
    }
  }
`;

const Profile = styled.label`
  margin-top: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  height: 135px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--black1);
  background: var(--gray);

  color: var(--black1);
  text-align: center;
  font-family: "Hack Regular";
  font-size: 12px;
  font-weight: 400;
`;

const ProfileImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  height: 135px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--black1);
  object-fit: cover;
`;

const LongBtn = styled.div`
  margin-top: 179px;
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 445.855px;
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

  @media (min-height: 718px) {
    position: fixed;
    bottom: 28px;
  }
`;
