import React, { useContext, useEffect, useState } from "react";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import deltImg from "../../images/delete.png";

const SocialProof = () => {
  const [data, setData] = useState([]);
  const [proof, setProof] = useState({
    text: "",
    digit: "",
  });
  const url = process.env.REACT_APP_DEV_URL;
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);

  const handleInputChange = (e, index) => {
    let { name, value } = e.target;
    if (index !== undefined) {
      let updatedData = data?.map((item, i) => {
        return i === index ? { ...item, [name]: value } : item;
      });
      setData(updatedData);
    } else {
      setProof({ ...proof, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {};
    if (data?.length > 0) {
      obj = {
        text: data?.map((e) => e?.text),
        digit: data?.map((e) => e?.digit),
      };
    } else {
      obj = proof;
    }
    try {
      let res = await fetch(`${url}/social/add`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });
      res = await res.json();
      console.log(res);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (i) => {
    let arr = [...data];
    arr.splice(i, 1);
    setData(arr);
  };

  const objToArrayConvert = (data) => {
    return data?.text?.map((_, index) => ({
      text: data?.text[index],
      digit: data?.digit[index],
    }));
  };

  useEffect(() => {
    getUserData();

    // console.log(objToArrayConvert(userData?.socialProof), "fgfgf");
    setData(objToArrayConvert(userData?.socialProof));
  }, []);
  return (
    <>
      <div className="vm-margin" style={{ padding: 0 }}>
        <div className="mlt-info">
          <span className="mlt-title">Info : </span>
          <span className="mlt-desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </span>
        </div>
        <div className="cont-formdiv">
          <form onSubmit={handleSubmit}>
            {/* <div>
              <div className="cont-forminput">
                <label>Input Taxt</label>
                <input type="text" onChange={(e)=>handleInputChange(e)} name="text" value={proof?.text} />
              </div>
              <div className="cont-forminput">
                <label>Input Digit</label>
                <input type="text" onChange={(e)=>handleInputChange(e)} name="digit" value={proof?.digit} />
              </div>
              <div className="mlt-btnmain">
                <div className="mlt-addmorebtn" onClick={()=>{
                  setData([...data,proof]);
                  setProof({
                    text:"",
                    digit:""
                  })
                }}></div>
                <div className="cont-btnmargin" style={{ paddingTop: 0 }}>
                  <TwoButton />
                </div>
              </div>
              </div> */}
            {data?.length > 0 ? (
              data?.map((ele, i) => {
                return (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>Social Proof {i + 1}</p>
                      <div className="" onClick={() => handleDelete(i)}>
                        <img src={deltImg} alt="delet-btn" />
                      </div>
                    </div>
                    <div className="cont-forminput">
                      <label>Input Taxt</label>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e, i)}
                        name="text"
                        value={ele?.text}
                      />
                    </div>
                    <div className="cont-forminput">
                      <label>Input Digit</label>
                      <input
                        type="text"
                        onChange={(e) => handleInputChange(e, i)}
                        name="digit"
                        value={ele?.digit}
                      />
                    </div>
                    {/* <div className="mlt-btnmain">
                      <div className="mlt-addmorebtn"></div>
                      <div className="cont-btnmargin" style={{ paddingTop: 0 }}>
                        <TwoButton />
                      </div>
                    </div> */}
                    
                  </div>
                );
              })
            ) : (
              <div>
                <div className="cont-forminput">
                  <label>Input Taxt</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    name="text"
                    value={proof?.text}
                  />
                </div>
                <div className="cont-forminput">
                  <label>Input Digit</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    name="digit"
                    value={proof?.digit}
                  />
                </div>
              </div>
            )}
                <div className="mlt-btnmain">
                  <div
                    className="mlt-addmorebtn"
                    onClick={() => {
                      setData([...data, proof]);
                      setProof({
                        text: "",
                        digit: "",
                      });
                    }}
                  ></div>
                  <div className="cont-btnmargin" style={{ paddingTop: 0 }}>
                    <TwoButton />
                  </div>
                </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SocialProof;
