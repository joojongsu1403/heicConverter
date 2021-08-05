import React, { useState } from "react";
import heic2any from "heic2any";
import HeicDownloader from "../components/HeicDownloader";

const HeicDownloaderContainer = () => {
  const [imgData, setImgData] = useState([]);
  const [imgType, setImgType] = useState("image/jpeg");
  const [quality, setQuality] = useState(3);
  const [fileNameList, setFileNameList] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    imgData.map((data) => {
      fetch(data, {
        ContentType: "application/json",
        Accept: "application/json",
      })
        .then((res) => res.blob())
        .then((blob) =>
          heic2any({
            blob,
            toType: imgType,
            quality: quality,
          })
        )
        .then((conversionResult) => {
          const url = URL.createObjectURL(conversionResult);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `image.jpg`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .then(() => {
          onReset();
        })
        .catch((e) => {
          console.log(e);
        });
      return console.log("출력완료");
    });
  };

  const onChange = (e) => {
    let array = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const test = URL.createObjectURL(e.target.files[i]);
      array.push(test);
    }
    setImgData(array);
  };

  const onReset = () => {
    setImgData([]);
    setFileNameList([]);
  };

  return (
    <HeicDownloader
      onSubmit={onSubmit}
      onChange={onChange}
      onReset={onReset}
      setImgType={setImgType}
      setQuality={setQuality}
      fileNameList={fileNameList}
      setFileNameList={setFileNameList}
    />
  );
};

export default HeicDownloaderContainer;
