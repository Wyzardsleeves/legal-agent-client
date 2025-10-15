import { useState, useRef } from "react";
import axios from "axios";
import loading_vector from '../assets/images/loading_vector_2.svg';
import { sampleQueries } from "../utils/queries";
import QueryResult from "./QueryResult";
import '../assets/styles/Page.css';

export default function Page() {
  const LOCAL_HOST = "http://localhost:5000";
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [recentQA, setRecentQA] = useState([]);
  const [subPage, setSubPage] = useState('results')
  const questionRef = useRef('');

  const askQuestion = () => {
    setAnswer({})
    setIsLoading(true)
    axios.post(`${LOCAL_HOST}/chat`, {
      message: question,
    })
    .then((response) => {
      setAnswer(response.data.answer)
      setRecentQA(prevQA => [response.data.answer, ...prevQA]);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false)
    });
  }

  const submit = () => {
    setSubPage('results');
    askQuestion();
  }
  
  const clear = () => {
    setQuestion('');
    questionRef.current.value = '';
  }

  const updateQuestion = e => {
    setQuestion(e.target.value);
  }

  const insertSampleQuery = query => {
    questionRef.current.value = query;
    setQuestion(query);
  }

  function isObjectEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  return (
    <div>
      <main>
        <section className="container">
          <div>
            <section className="section-space">
              <h4>Suggested Queries</h4>
              {sampleQueries.map((query, index) => (
                <span key={`${index}-${query}`} className="query-text" onClick={() => insertSampleQuery(query)}>
                  <p className=" blue-text grey darken-3">
                    #{query}
                  </p>
                </span>
              ))}
            </section>
            <section className="input section-space">
              <div>
                <h4>Insert Question</h4>
              </div>
              <div className="input-field col s12">
                <input 
                  id="question"
                  ref={questionRef}
                  type="text" 
                  className="validate" 
                  onChange={updateQuestion}
                  maxlength="150"
                />
                <label htmlFor="question">What do you need? <span className="red-text">(150 character limit)</span></label>
              </div>
              <div className="right-align form-buttons">
                <button 
                  type="submit" 
                  name="action"
                  className="btn"
                  onClick={submit}
                >
                  Submit
                </button>
                <button 
                  type="button"
                  className={`btn waves-effect waves-light orange lighten-1`}
                  onClick={clear}
                >
                  Clear
                </button>
              </div>
            </section>
            {recentQA.length > 0 && (
              <section className="section-space">
                <span className="link">
                  <a onClick={() => setSubPage('results')}>
                    <h5>Results</h5>
                  </a>
                  <a onClick={() => setSubPage('recentQueries')}>
                    <h5>Recent Queries</h5>
                  </a>
                </span>
              </section>
            )}
            {subPage === "results" && (
              <section className="section-space">
                {isObjectEmpty(answer) &&
                  <>
                    <h4>Results</h4>
                    <QueryResult answer={answer} />
                  </>
                }
                {isLoading &&
                  <div className="card-panel grey darken-4 col s12">
                    <h3 className="center">Loading info....</h3>
                      <img
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        src={loading_vector}
                        alt="loading_vector.svg"
                      />
                  </div>
                }
              </section>
            )}
            {subPage === "recentQueries" && (
              <section className="section-space">
                <div>
                  {recentQA.length > 0 && (
                    <> 
                      <h4>Recent Queries</h4>
                      {recentQA.map((answer) => (
                          <QueryResult answer={answer} />
                      ))}
                    </>
                  )}
                </div>
              </section>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
