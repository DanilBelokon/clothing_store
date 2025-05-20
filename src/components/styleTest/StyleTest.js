import { useState } from "react";
import { questions } from "../../data/questions";
import { results } from "../../data/result";
import "./style.css";

const StyleTest = ({
  onApplyFilter,
  onResetFilter,
  activeFilter,
  toggleFilterActive,
  styleFilterActive,
}) => {
  const [showTestModal, setShowTestModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);

  const startTest = () => {
    setShowTestModal(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTestResult(null);
  };

  const handleAnswerSelect = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers) => {
    const scoreCount = answers.reduce((acc, score) => {
      acc[score] = (acc[score] || 0) + 1;
      return acc;
    }, {});

    const maxScore = Object.keys(scoreCount).reduce((a, b) =>
      scoreCount[a] > scoreCount[b] ? a : b
    );

    const result = results.find((r) => r.id === maxScore);
    setTestResult(result);
  };

  const handleApplyFilter = () => {
    onApplyFilter(testResult.recommendedItems);
    setShowTestModal(false);
  };

  return (
    <div className="style-test-wrapper" id="style-test">
      <h2>
        Не можете найти себе подходящую вещь? Пройдите тест и система
        отфильтрует каталог под вас!
      </h2>
      <div className="style-test-container">
        <button onClick={startTest} className="style-test-button">
          Определить ваш стиль
        </button>

        {activeFilter ? (
          <div>
            <span>Ваш стиль: </span>
            <button
              onClick={toggleFilterActive}
              className={
                styleFilterActive
                  ? "style-filter-button-active"
                  : "style-filter-button"
              }
            >
              {activeFilter.title}
            </button>
            <button className="close-test" onClick={onResetFilter}>
              x
            </button>
          </div>
        ) : (
          <span>
            Ваш стиль еще не определен. Узнайте его и получите свою подборку
            одежды.
          </span>
        )}

        {showTestModal && (
          <div className="modal-overlay">
            <div className="style-test-modal">
              {!testResult ? (
                <>
                  <button
                    className="close-button"
                    onClick={() => setShowTestModal(false)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "10px",
                      background: "none",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                  <h3>{questions[currentQuestionIndex].text}</h3>
                  <div className="test-options">
                    {questions[currentQuestionIndex].options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswerSelect(option.score)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                  <div className="test-progress">
                    Вопрос {currentQuestionIndex + 1} из {questions.length}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="result-title">
                    Ваш стиль: {testResult.title}
                  </h3>
                  <p>{testResult.description}</p>
                  <div className="modal-buttons">
                    <button
                      onClick={handleApplyFilter}
                      className="apply-button"
                    >
                      Применить фильтр
                    </button>
                    <button
                      onClick={() => setShowTestModal(false)}
                      className="close-button"
                    >
                      Закрыть
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleTest;
