import React from "react";
import useFetchData from "../customhooks/useFetchData";
import "./movieList.css";

export const MoviesList = () => {
  const userDetails = useFetchData("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      <h1>Movies</h1>
      <ul>
        <div className="flex">
          {userDetails &&
            userDetails.map((user) => {
              return (
                <a href="..">
                  <div key={user.id}>
                    <p>{user.first_name}</p>
                    <p>{user.email}</p>
                    <img key={user.avatar} src={user.avatar} alt="user pic" />
                  </div>
                </a>
              );
            })}
        </div>
      </ul>
    </>
  );
};

export default MoviesList;
