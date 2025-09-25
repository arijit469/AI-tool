import { useState, useEffect } from "react";
import "./App.css";
import { URL } from "./constants";
import RecentSearch from "./components/recenetSearch"; // fixed typo & capitalization
import QuestionAnswer from "./components/Question"; // ensure file exists

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [darkmode, setDarkmode] = useState("dark"); // default dark

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(stored);
  }, []);

  // Apply dark/light mode to HTML root
  useEffect(() => {
    if (darkmode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkmode]);

  // Function to ask a question
  const askQuestion = async () => {
    if (!question.trim()) return;

    const payload = { contents: [{ parts: [{ text: question }] }] };
    setLoader(true);

    // Update history
    try {
      const updatedHistory = [question, ...history];
      localStorage.setItem("history", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch {
      localStorage.setItem("history", JSON.stringify([question]));
      setHistory([question]);
    }

    // Fetch response
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      response = await response.json();
      const datastring = response.candidates[0]?.content?.parts[0]?.text || "";

      const processed = datastring
        .split(" * ")
        .map((item) => item.replace(/\*/g, "").trim())
        .filter((item) => item.length > 0);

      setResult((prev) => [...prev, { question, answers: processed }]);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoader(false);
    }
  };

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div className="h-screen w-screen text-white md:grid md:grid-cols-5">
      <RecentSearch
        history={history}
        setQuestion={setQuestion}
        clearHistory={clearHistory}
        darkmode={darkmode}
        setDarkmode={setDarkmode}
      />

      <QuestionAnswer
        result={result}
        question={question}
        setQuestion={setQuestion}
        askQuestion={askQuestion}
        loader={loader}
      />
    </div>
  );
}

export default App;
