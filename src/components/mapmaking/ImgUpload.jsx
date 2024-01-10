import React, { useState } from "react";
import { styled } from "styled-components";

const ImgUpload = ({ onImageUpload }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
    setImgUrl(URL.createObjectURL(file));
    onImageUpload(file);
  };

  return (
    <Wrapper>
      <label>
        <input type="file" onChange={handleImgChange} />
        {imgUrl ? (
          <StyledImg src={imgUrl} alt="Preview" />
        ) : (
          "Tap to add photo!"
        )}
      </label>
    </Wrapper>
  );
};

export default ImgUpload;

const Wrapper = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 156.787px;
    height: 156.787px;
    flex-shrink: 0;
    border: 1.527px solid var(--black1);
    color: var(--black1);
    text-align: center;
    font-family: "Hack Regular";
    font-size: 14.253px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 2.138px;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
