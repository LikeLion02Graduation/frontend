import React from "react";
import { Navigate } from "react-router-dom";

import { http, refreshAuthorizationHeader } from "../api/http";
import { persistor } from "../index";

// POST : 로그인
export const PostLogin = async (user_id, password, navigate) => {
  try {
    const response = await http.post("/accounts/signin/", {
      username: user_id,
      password: password,
    });

    localStorage.setItem("userId", response.data.data.id);
    localStorage.setItem("nickname", response.data.data.nickname);
    localStorage.setItem("token", response.data.data.access_token);

    console.log(response.data.data);
    alert("로그인에 성공했습니다!");
    refreshAuthorizationHeader();

    const from = sessionStorage.getItem("from");
    navigate(from || "/");
    window.sessionStorage.removeItem("from");

    return Promise.resolve(response.data.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error.non_field_errors);
    }
    console.error("로그인 실패", error.response);
  }
};

// GET : 카카오 로그인
export const KakaoLogin = async (code) => {
  try {
    const response = await http.get(`/accounts/kakao/callback/?code=${code}`);
    localStorage.setItem("userId", response.data.data.id);
    localStorage.setItem("nickname", response.data.data.nickname);
    localStorage.setItem("token", response.data.data.access_token);

    refreshAuthorizationHeader();

    console.log(response.data.data);
    return Promise.resolve(response.data.data);
  } catch (error) {
    throw error;
  }
};

// Patch : 이름/프로필 이미지 변경
export const PatchUserInfo = async (nickname, profile) => {
  try {
    const response = await http.patch(`/accounts/kakao/edit/`, {
      nickname: nickname,
      profile: profile,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("이름/프로필 이미지 변경 실패", error.response);
  }
};

// 로그아웃
export const Logout = () => {
  persistor.purge();
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("nickname");
  window.localStorage.removeItem("token");
  window.sessionStorage.removeItem("from");
  window.location.replace("/auth/login");
};

// GET : 아이디 중복 확인
export const GetDuplicate = async (user) => {
  try {
    const response = await http.get(`/accounts/duplicate/?username=${user}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error("아이디 중복 확인 실패", error.response);
    return Promise.reject(error);
  }
};

// POST : 회원가입
export const PostSignup = async (user_id, password, username, profile, navigate) => {
  try {
    const formData = new FormData();
    formData.append("username", user_id);
    formData.append("password", password);
    formData.append("nickname", username);
    if (profile) {
      formData.append("profile", profile);
    }

    const response = await http.post("/accounts/signup/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("가입이 완료되었습니다.");
    navigate("/auth/login");

    return Promise.resolve(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error.non_field_errors);
    }
    console.error("회원가입 실패", error.response);
  }
};

// DELETE : 회원 탈퇴
export const DeleteAccount = async () => {
  try {
    const response = await http.delete(`/accounts/del/`);
    console.log("message: ", response);
    Logout();
  } catch (error) {
    console.error("회원 탈퇴 실패", error.response);
  }
};

// GET : 마이페이지 로그인 정보
export const GetLoginInfo = async () => {
  try {
    const response = await http.get(`/accounts/kakao/edit/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    isTokenExpired(error);
    console.error("로그인 정보 조회 실패", error.response);
  }
};

// PATCH : 마이페이지 닉네임 수정
export const PatchNickname = async (nickname) => {
  try {
    const response = await http.patch(`/accounts/kakao/edit/`, {
      nickname,
    });
    console.log(response.data);
    localStorage.setItem("nickname", nickname);
    return response.data;
  } catch (error) {
    console.error("닉네임 수정 실패", error.response);
  }
};

// PATCH : 소셜로그인 프로필 수정
export const PatchSocialProfile = async (nickname, profile, isImgChanged, navigate) => {
  try {
    const formData = new FormData();
    formData.append("nickname", nickname);
    if (isImgChanged) formData.append("profile", profile);

    const response = await http.patch(`/accounts/kakao/edit/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    localStorage.setItem("nickname", response.data.data.nickname);
    console.log(response);

    const from = sessionStorage.getItem("from");
    navigate(from || "/");
    window.sessionStorage.removeItem("from");

    return response.data;
  } catch (error) {
    console.error("소셜 로그인 프로필 수정 실패", error.response);
  }
};

//isLogin + AuthRoute
const isLogin = () => !!localStorage.getItem("token");

export default function AuthRoute({ children }) {
  if (isLogin()) {
    return children;
  } else {
    alert("로그인이 필요합니다:(");
    sessionStorage.setItem("from", window.location.pathname);
    return <Navigate to="/auth/login" />;
  }
}

// 토큰 만료 처리
export const isTokenExpired = async (error) => {
  if (error.response.data.code === "token_not_valid") {
    alert("세션 만료. 다시 로그인해주세요.");
    Logout();
  }
};
