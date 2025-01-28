import React, { useContext, useEffect, useState } from "react";
import TwoButton from "./TwoButton";
import userContext from "../../context/userDetails";
import deltImg from "../../images/delete.png";


const TeamMember = () => {
  const [team, setTeam] = useState({
    name: "",
    job_title: "",
    number: "",
  });
  const [data, setData] = useState([]);

  const url = process.env.REACT_APP_DEV_URL;
  const { userData, AuthorizationToken, getUserData } = useContext(userContext);

  const handleChange = (e, index) => {
    let { name, value } = e.target;
    if (index !== undefined) {
      let updatedData = data?.map((item, i) => {
        return i === index ? { ...item, [name]: value } : item;
      });
      setData(updatedData);
    } else {
      setTeam({ ...team, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {};
    if (data?.length > 0) {
      obj = {
        name: data?.map((e) => e.name),
        job_title: data?.map((e) => e.job_title),
        number: data?.map((e) => e.number),
      };
    } else {
      obj = team;
    }

    try {
      console.log(obj, "team");
      let res = await fetch(`${url}/team/add`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });
      res = await res.json();
      console.log(res);
      alert(res.msg||"Data not add")
      getUserData();      
    } catch (error) {
      console.log(error);
      alert(error.res?.msg || "Data not add")
    }
  };

  const handleDelete=(i)=>{
let arr=[...data]
     arr?.splice(i, 1);
    setData(arr)
  }

  const objToArrayConvert = (data) => {
    if (!data || !data?.name || !data?.job_title || !data?.number) {
      return []; // Return an empty array if data is invalid
    }
    return data?.name?.map((_, index) => ({
      name: data?.name[index],
      job_title: data?.job_title[index],
      number: data?.number[index],
    }));
  };
  
  useEffect(() => {
    getUserData();
    console.log(objToArrayConvert(userData?.teamMember), "fgfgf");
    setData(objToArrayConvert(userData?.teamMember));
  }, []);

  return (
    <div className="vm-margin" style={{ padding: 0 }}>
      <div className="mlt-info">
        <span className="mlt-title">Info : </span>
        <span className="mlt-desc">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </span>
      </div>
      <div className="cont-formdiv">
        <form onSubmit={handleSubmit}>
          {data?.length > 0 ? (
            data?.map((ele, i) => {
              return (
                <div div key={i}>
                     <hr />
                  <div style={{ display: "flex",justifyContent:"space-between", alignItems:"center" }}>
                    <p>Member {i + 1}</p>
                    <div className="" onClick={()=>handleDelete(i)} >
                      <img src={deltImg} alt="delet-btn" />
                    </div>
                  </div>
                  <br />
               
                  <div
                    className="cont-forminput"
                    
                  >
                    <label>Name</label>
                    <input
                      type="text"
                      value={ele?.name}
                      name="name"
                      onChange={(e) => handleChange(e, i)}
                    />
                  </div>
                  <div className="cont-forminput">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={ele?.job_title}
                      name="job_title"
                      onChange={(e) => handleChange(e, i)}
                    />
                  </div>
                  <div className="cont-forminput">
                    <label>Number</label>
                    <input
                      type="text"
                      value={ele?.number}
                      name="number"
                      onChange={(e) => handleChange(e, i)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="cont-forminput">
                <label>Name</label>
                <input
                  type="text"
                  value={team?.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="cont-forminput">
                <label>Job Title</label>
                <input
                  type="text"
                  value={team?.job_title}
                  name="job_title"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="cont-forminput">
                <label>Number</label>
                <input
                  type="text"
                  value={team?.number}
                  name="number"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </>
          )}
          <div className="mlt-btnmain">
            <div
              className="mlt-addmorebtn"
              onClick={() => {
                setData([...data, team]);
                setTeam({
                  name: "",
                  job_title: "",
                  number: "",
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
  );
};

export default TeamMember;
