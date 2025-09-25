import React, { useState, useEffect } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ यहाँ अपना JSON लिंक डालें
  const DATA_URL = "https://raw.githubusercontent.com/abhishekchauhan-1/raw-test-json/refs/heads/main/questions.json";
  // उदाहरण: https://raw.githubusercontent.com/abhishek123/myquiz/main/questions.json

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading questions:", err);
        setLoading(false);
      });
  }, []);

  const handleOptionClick = (index) => {
    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow-50">
        <p className="text-lg font-semibold">⏳ प्रश्न लोड हो रहे हैं...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6">
        {!showResult ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              प्रश्न {current + 1}: {questions[current].question}
            </h2>
            <div className="space-y-2">
              {questions[current].options.map((opt, index) => (
                <button
                  key={index}
                  className={`w-full p-2 rounded-xl border text-left transition 
                    ${
                      selected !== null && index === questions[current].answer
                        ? "bg-green-200 border-green-500"
                        : selected === index
                        ? "bg-red-200 border-red-500"
                        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                  onClick={() => handleOptionClick(index)}
                  disabled={selected !== null}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selected !== null && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm font-medium">
                  {selected === questions[current].answer ? "✅ सही उत्तर!" : "❌ गलत उत्तर!"}
                </p>
                <p className="text-sm mt-2">{questions[current].explanation}</p>
                <button
                  onClick={nextQuestion}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  अगला प्रश्न ➡️
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 टेस्ट पूरा हुआ!</h2>
            <p className="mb-2">आपका स्कोर: {score} / {questions.length}</p>
            <p className="text-gray-600">
              बहुत अच्छा! अब आप अध्याय 1-5 दोबारा पढ़ सकते हैं और कठिन प्रश्नों पर ध्यान दे सकते हैं।
            </p>
          </div>
        )}
      </div>
      <footer className="mt-6 text-sm text-gray-500">
        Made with ❤️ by Abhishek & Isha
      </footer>
    </div>
  );
}
