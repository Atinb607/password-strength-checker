import { useState } from "react";
import ScoreDial from "./components/ScoreDial.jsx";
import CriteriaList from "./components/CriteriaList.jsx";
import Suggestions from "./components/Suggestions.jsx";
import {
  analyzePassword,
  getPasswordSuggestions,
  generateStrongPassword
} from "./utils/passwordUtils.js";
import "./App.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [analyzedData, setAnalyzedData] = useState({
    score: 0,
    criteriaMet: [],
    criteriaLabels: []
  });
  const [suggestions, setSuggestions] = useState([]);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Analyze on blur or submit
  function analyzeCurrentPassword(pw) {
    const { score, criteriaMet, criteriaLabels } = analyzePassword(pw);
    setAnalyzedData({ score, criteriaMet, criteriaLabels });
    setSuggestions(getPasswordSuggestions(pw));
  }

  // Handle input change (no immediate analysis)
  function handleChange(e) {
    setPassword(e.target.value);
    setGeneratedPassword("");
  }

  // On blur analyze
  function handleBlur() {
    analyzeCurrentPassword(password);
  }

  // Optional: analyze on Enter key pressed
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      analyzeCurrentPassword(password);
    }
  }

  function handleGenerate() {
    const newPass = generateStrongPassword();
    setGeneratedPassword(newPass);
    setPassword(newPass);
    analyzeCurrentPassword(newPass);
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      {/* Background video container */}
      <video autoPlay loop muted id="bg-video" className="background-video">
        <source src="/your-video-file.mp4" type="video/mp4" />
        {/* Add fallback text */}
        Your browser does not support HTML5 video.
      </video>

      {/* Main app container */}
      <div className="main-container dark-mode">
        <h2>Password Strength Checker</h2>
        <div className="input-wrapper">
          <input
            type={visible ? "text" : "password"}
            value={password}
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Enter your password"
            className="password-input"
          />
          <label className="show-password-label">
            <input
              type="checkbox"
              checked={visible}
              onChange={e => setVisible(e.target.checked)}
            />
            Show Password
          </label>
        </div>

        <div className="dial-row">
          <ScoreDial score={analyzedData.score} />
        </div>
        <div className="criteria-row">
          <CriteriaList
            criteriaMet={analyzedData.criteriaMet}
            criteriaLabels={analyzedData.criteriaLabels}
          />
        </div>
        <Suggestions
          suggestions={suggestions}
          showGenerator={analyzedData.score < 4}
          onGenerate={handleGenerate}
          generatedPassword={generatedPassword}
          onCopy={handleCopy}
        />
      </div>
    </>
  );
}
