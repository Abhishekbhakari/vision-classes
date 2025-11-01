import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHomeworkToLecture } from "../../Redux/lectureSlice";
import { toast } from "react-hot-toast";

const blankQuestion = () => ({ text: "", solution: "" });

export default function DynamicHomeworkForm({ courseId, lectureId, onAdded }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [questions, setQuestions] = useState([blankQuestion()]);

  const addQuestion = () => setQuestions((q) => [...q, blankQuestion()]);
  const removeQuestion = (idx) => setQuestions((q) => q.filter((_, i) => i !== idx));
  const updateQuestion = (idx, field, value) =>
    setQuestions((q) => q.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const validate = () => {
    if (!title.trim()) return "Homework title is required";
    if (!questions.length) return "Add at least one question";
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text?.trim()) return `Question ${i + 1} text is required`;
    }
    return null;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    const payload = {
      title,
      description,
      questions: questions.map((q, idx) => ({ text: q.text, solution: q.solution, order: idx })),
      dueDate: dueDate || undefined,
    };

    const res = await dispatch(addHomeworkToLecture({ courseId, lectureId, homework: payload }));
    if (res?.payload?.success) {
      toast.success("Homework added");
      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setQuestions([blankQuestion()]);
      if (typeof onAdded === "function") onAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Homework title"
        className="w-full p-2 bg-transparent border"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Homework description (optional)"
        className="w-full p-2 bg-transparent border resize-none h-20"
      />
      <div className="flex gap-2 items-center">
        <label className="text-sm text-gray-400">Due date (optional)</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-1 bg-transparent border"
        />
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div key={idx} className="p-2 border rounded">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <label className="text-sm text-gray-300">Question {idx + 1}</label>
                <textarea
                  value={q.text}
                  onChange={(e) => updateQuestion(idx, "text", e.target.value)}
                  placeholder={`Enter question ${idx + 1}`}
                  className="w-full p-2 bg-transparent border resize-none h-20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  className="px-2 py-1 bg-red-600 rounded text-sm"
                  disabled={questions.length === 1}
                  title="Remove question"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="mt-2">
              <label className="text-sm text-gray-300">Solution (optional)</label>
              <textarea
                value={q.solution}
                onChange={(e) => updateQuestion(idx, "solution", e.target.value)}
                placeholder="Enter solution — supports HTML or plain text"
                className="w-full p-2 bg-transparent border resize-none h-24"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={addQuestion} className="px-3 py-1 bg-gray-700 rounded">
          + Add Question
        </button>
        <button type="submit" className="px-3 py-1 bg-amber-600 rounded">
          Save Homework
        </button>
      </div>
    </form>
  );
}
