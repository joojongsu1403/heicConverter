import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const HeicDownloader = ({
  onSubmit,
  onChange,
  onReset,
  setImgType,
  setQuality,
  fileNameList,
  setFileNameList,
}) => {
  const imageTypeData = ["jpeg", "png", "gif"];
  const imageQuality = [
    {
      quality: 3,
      qualityName: "상",
    },
    {
      quality: 2,
      qualityName: "중",
    },
    {
      quality: 1.5,
      qualityName: "하",
    },
  ];

  const selectImage = (e) => {
    let array = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const data = e.target.files[i].name;
      array.push(data);
    }
    setFileNameList(array);
    onChange(e);
  };

  const imageDownloads = async (e) => {
    await onSubmit(e);
    const input = document.querySelector("#fileSelector");
    input.value = "";
  };

  return (
    <ImgdownloadBlock className="App">
      <div className="title">
        <h2>HEIC 이미지 확장자 변환 다운로더</h2>
        <span>ver.1</span>
      </div>
      <form onSubmit={imageDownloads}>
        <div className="fileSelectTitle">
          <div>이미지 선택</div>
          <div>확장자 선택</div>
          <div>해상도 선택</div>
        </div>
        <div className="fileTypeSelectWrapper">
          <label htmlFor="fileSelector" className="fileSelectBtn">
            파일선택
            <input
              id="fileSelector"
              type="file"
              name="input_file"
              accept=".heic"
              multiple
              onChange={(e) => selectImage(e)}
            />
          </label>
          <select onChange={(e) => setImgType(e.target.value)}>
            {imageTypeData.map((data, index) => (
              <option key={index} value={`image/${data}`}>
                {data}
              </option>
            ))}
          </select>
          <select onChange={(e) => setQuality(e.target.value)}>
            {imageQuality.map((data, index) => (
              <option key={index} value={data.quality}>
                {data.qualityName}
              </option>
            ))}
          </select>
        </div>

        <div className="submitBtnWrapper">
          <button type="submit" className="submitBtn">
            저장
          </button>
          <button type="button" onClick={onReset}>
            선택파일 초기화
          </button>
        </div>
      </form>
      <div className="imgSelectList">
        <span>선택한 이미지 리스트</span>
        <ul>
          {fileNameList.length !== 0 ? (
            <>
              {fileNameList.map((list, index) => (
                <li key={index}>
                  <span>●</span> {list}
                </li>
              ))}
            </>
          ) : (
            <li>
              <span>●</span> 이미지가 없습니다.
            </li>
          )}
        </ul>
      </div>
    </ImgdownloadBlock>
  );
};

export default HeicDownloader;

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: inherit;
        outline: none;
        list-style: none;
        text-decoration: none;
        font-family: inherit;
    }
  
`;

const ImgdownloadBlock = styled.div`
  background-color: #5e8eb6;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > .title {
    width: 1000px;
    font-size: 23px;
    color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > form {
    padding: 50px 0;
    width: 1000px;
    border-radius: 10px;
    background-color: #eee;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
    & > .fileSelectTitle {
      width: 800px;
      height: 30px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      & > div {
        width: 150px;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
      }
      & > div:nth-child(1) {
        width: 200px;
      }
    }
    & > .fileTypeSelectWrapper {
      width: 800px;
      height: 100px;
      background-color: steelblue;
      margin: 0 auto;
      margin-top: 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      & > .fileSelectBtn {
        display: block;
        width: 200px;
        height: 50px;
        background-color: #fff;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        font-size: 22px;
        font-weight: 600;
        & > input {
          display: none;
        }
      }
      & > select {
        width: 150px;
        height: 50px;
        border: 0;
        background-color: #fff;
        padding-left: 10px;
        font-size: 22px;
        font-weight: 600;
      }
    }
    & > .submitBtnWrapper {
      width: 430px;
      margin: 0 auto;
      margin-top: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > button {
        display: block;
        border: 0;
        border-radius: 10px;
        padding: 7px 50px;
        font-size: 23px;
        background-color: steelblue;
        cursor: pointer;
        color: #fff;
        font-weight: 600;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
      }
      & > button:hover {
        color: #333;
        background-color: #fff;
      }
    }
  }

  & > .imgSelectList {
    width: 1000px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    & > span {
      width: 600px;
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      font-size: 23px;
      color: #eee;
    }
    & > ul {
      flex: 1;
      margin: 0;
      margin: 15px;
      padding: 0;
      width: 600px;
      list-style: none;
      overflow: hidden;
      overflow-y: scroll;
      & > li {
        width: 95%;
        padding: 7px 0;
        background-color: #eee;
        border-radius: 10px;
        font-size: 20px;
        padding-left: 20px;
        margin-bottom: 10px;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
        & > span {
          margin-right: 10px;
          color: #555;
        }
      }
    }
    /* & > ul::-webkit-scrollbar {
      display: none;
    } */
  }
`;
