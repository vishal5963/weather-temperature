import React from "react";

const TableData = ({
    temp_arr,
    city,
    country
}) => {
    console.log(city, "*******");
    return (
        <div className="weather__info">
        {console.log(temp_arr !== undefined && temp_arr.length !== 0, "===1====")}
        {temp_arr && temp_arr.length !== 0 && <table style={{color: "red", width: "700px", border: "2px solid red"}}>
            <tbody>
            {
                    temp_arr.map((tempList,i) =>(
                    <tr key={i} >
                        <td>{city},{country}</td>
                        <td>{tempList.main.temperature}</td>
                        <td>{tempList.main.humidity}</td>
                        <td>{tempList.weather[0].description}</td>
                        <td>{tempList.dt_txt}</td>
                        <td>{tempList.error}</td>
                    </tr>
                    ))
            }
            </tbody>
        </table>}
    </div>
  );
};
export default TableData;
