import React, { useEffect, useState } from 'react';
import "./App.css";
import { Header } from './components/Header/Header';
import { Question } from './models/Questions';
import { Home } from './pages/Home';
import { QuizAttempt } from './pages/QuizAttempt';
import { QuizReview } from './pages/QuizReview';

type AnswerStore = { [_: string]: number | undefined };
type NullableAnswerStore = AnswerStore | undefined;
type NullableQuestions = Question[] | undefined;

const endpoints = {
  newAttempt: {
    url: "https://wpr-quiz-api.herokuapp.com/attempts",
    method: "POST"
  },
  submit: {
    url: "https://wpr-quiz-api.herokuapp.com/attempts/:id/submit",
    method: "POST"
  }
};

function App() {
  const [answers, setAnswers] = useState<NullableAnswerStore>(undefined);
  const [questions, setQuestions] = useState<NullableQuestions>();
  const [attemptId, setAttemptId] = useState("");
  const [remark, setRemark] = useState("")

  useEffect(() => {
    const _answers = questions?.map((q) => [q.id, q.selectedAnswer])
      .reduce(
        (accumulate, [qId, selected]) =>
          (accumulate[qId!] = selected as number | undefined, accumulate),
        {} as AnswerStore
      );
    setAnswers(_answers);
  }, [questions]);

  const toAttemptQuestions = (data: any) => {
    const responseQuestions: any[] = data.questions;
    return responseQuestions.map<Question>((q) => ({
      id: q._id,
      answers: q.answers,
      text: q.text,
      selectedAnswer: data.answers && data.answers[q._id],
      correctAnswer: data.correctAnswers && data.correctAnswers[q._id]
    }));
  };

  const toJson = (response: Response) => response.json();

  const setupAttemptId = (data: any) => {
    setAttemptId(data._id);
    return data;
  };

  const setupRemark = (data: any) => {
    setRemark(data.scoreText);
    return data;
  };
  
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const newAttempt = () => {
    const { url, method } = endpoints.newAttempt;
    fetch(url, { method })
      .then(toJson)
      .then(setupAttemptId)
      .then(toAttemptQuestions)
      .then(setQuestions)
      .then(scrollTop);
  };

  const submitAttempt = () => {
    const willAbort = !window.confirm("Submit your answers?");
    if (willAbort) {
      return;
    }
    const { url, method } = endpoints.submit;
    const finalUrl = url.replace(":id", attemptId);
    const body = JSON.stringify({ answers });
    const headers = { "Content-Type": "application/json" };
    fetch(finalUrl, { method, body, headers })
      .then(toJson)
      .then(setupRemark)
      .then(toAttemptQuestions)
      .then(setQuestions);
  };

  const onAnswerChanged = (question: string, answer: number) => {
    const newAnswer: AnswerStore = {};
    newAnswer[question] = answer;
    setAnswers({ ...answers, ...newAnswer });
  };
  const reset = () => {
    setQuestions(undefined);
    setAnswers(undefined);
    scrollTop();
  };

  const noCorrectAnswer = (q: Question) => !q.correctAnswer;
  const isInAttempt = () => questions !== undefined;
  const currentScreen = () => {
    if (!isInAttempt()) {
      return <Home onStart={newAttempt} />;
    } else if (questions!.every(noCorrectAnswer)) {
      return (
        <QuizAttempt questions={questions!}
          answers={answers!}
          handleSubmit={submitAttempt}
          onAnswerChanged={onAnswerChanged} />
      );
    } else {
      return (
        <QuizReview questions={questions!}
          answers={answers!} remark={remark}
          handleRetry={reset}
          onAnswerChanged={onAnswerChanged} />
      );
    }
  }

  return (
    <div className="App">
      <Header />
      {currentScreen()}
    </div>
  );
}

export default App;
