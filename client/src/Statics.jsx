import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Statics({ month }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4040/statistics?month=${month}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, [month]);
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "25px auto" }}>
        {`Sales Data  of  ${month}`}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "",
          border: "none",
          width: "30vw",
          padding: "20px",
          margin: "25px auto",
          borderRadius: "20px",
          height: "20vh",
          backgroundColor: "skyblue",
          cursor: "pointer",
        
        }}
      >
        <h4>
          Total sale{" "}
          <span style={{ color: "red" }}> Rs {data.totalAmount} </span>{" "}
        </h4>
        <h4>
          {" "}
          soldItems <span style={{ color: "red" }}>
            {" "}
            {data.totalNotSold}{" "}
          </span>{" "}
        </h4>
        <h4>
          Total not Sold Items{" "}
          <span style={{ color: "red" }}> {data.totalSold} </span>{" "}
        </h4>
      </div>
    </>
  );
}
