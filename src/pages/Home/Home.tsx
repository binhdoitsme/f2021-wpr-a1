import React from "react";
import "./home.css";

type HomeProps = {
  onStart: () => void;
};

export function Home({ onStart }: HomeProps) {
  return (
    <>
      <div className="introduction">
        <h2 className="header">The test</h2>
        <div className="content">
          The test contains 10 questions and there is no time limit.
        </div>
        <div className="content">
          The test is not official, it's just a nice way to see how much you know, or don't know, about HTML.
        </div>
        <h2 className="header">Count your score</h2>
        <div className="content">
          You will get 1 point for each correct answer. At the end of the Quiz, your total score will be displayed. Maximum score is 10 points.
        </div>
      </div>
      <br />
      <div className="start">
        <h2 className="header">Start the quiz</h2>
        <div className="content">Good luck!</div>
        <br />
        <div className="content">
          <button className="btn blue" onClick={onStart}>
            Start the HTML quiz &gt;
          </button>
        </div>
      </div>
      <br />
    </>
  );
}
