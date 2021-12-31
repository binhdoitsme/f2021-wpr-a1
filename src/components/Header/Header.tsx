import React from "react";
import "./header.css";
import "./background.jpg";

export function Header() {
  return (
    <>
      <div className="heading">
        <span className="course-title">WPR</span>
        <div className="characters">
          <span className="character">M</span>
          <span className="character">E</span>
          <span className="character">R</span>
          <span className="character">N</span>
        </div>
      </div>
      <div className="title">
        <span>HTML Quiz</span>
      </div>
      <small className="author">By BinhDH</small>
    </>
  )
}
