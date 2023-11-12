// src/components/ComicForm.js
import React, { useState } from "react";
import ComicDisplay from "./ComicDisplay";
import "bootstrap/dist/css/bootstrap.css";

async function generateComic(data) {
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        Accept: "image/png",
        Authorization: `Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  const result = await response.blob();
  console.log(result);
  return URL.createObjectURL(result);
}

const ComicForm = () => {
  const [panelTexts, setPanelTexts] = useState(Array(10).fill(""));
  const [comicArr, setComicArr] = useState(Array(10).fill(""));

  const handleTextChange = (index, text) => {
    const updatedTexts = [...panelTexts];
    updatedTexts[index] = text;
    setPanelTexts(updatedTexts);
  };

  const handleSubmit = async () => {
    // Assuming generateComic is a function passed as a prop
    const imgARR = [...panelTexts];
    const imgARR2 = [...comicArr];
    try {
      for (let i = 0; i < 10; i++) {
        if (imgARR[i] === "") {
          continue;
        }
        const url = await generateComic({ inputs: imgARR[i] });
        imgARR2[i] = url;
      }
      setComicArr(imgARR2);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-center p-2">
        <h2 style={{ color: "#5bc0de", fontSize: "28px" }}>
          Comic Strip Generator
        </h2>
      </div>
      <div class="row justify-content-center clearfix">
        <div class="col"  style={{maxWidth:'350px'}}>
          <form>
            {panelTexts.map((text, index) => (
              <div key={index} className="form-group">
                <label
                  className="lead"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >{`Panel ${index + 1}: `}</label>
                <input
                  class="shadow-sm p-3 mb-2 bg-white rounded form-control"
                  // class="form-control"
                  style={{ width: "300px", height: "30px" }}
                  type="text"
                  value={text}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                />
              </div>
            ))}
          </form>
        </div>
        <div class="col row align-items-center ">
          {comicArr.map(
            (img, i) => (
              console.log(img, "manc"),
              (
                <div className="col">
                  <ComicDisplay imgURL={img} />
                </div>
              )
            )
          )}
          <div className="d-flex justify-content-center">
            <button
              class="btn btn-info"
              style={{height:'50px' , width:'150px',color:'white',fontSize:'15px',fontWeight:'bold'}}
              type="button"
              onClick={() => handleSubmit()}
            >
              Generate Comic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicForm;
