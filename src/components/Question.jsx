import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

function QuestionAnswer({ result, question, setQuestion, askQuestion, loader }) {
  const scrollToAns = useRef();

  useEffect(() => {
    if (scrollToAns.current) {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }
  }, [result]);

  return (
    <div className="col-span-3 flex flex-col h-screen">
      {/* Heading */}
      <div className="w-full p-4 sm:p-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-violet-700">
          Hello User, Ask me Anything - Created by Arijit
        </h1>
      </div>

      {/* Loader */}
      {loader && (
        <div className="flex justify-center mb-4">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591
                   C22.3858 100.591 0 78.2051 0 50.5908
                   C0 22.9766 22.3858 0.59082 50 0.59082
                   C77.6142 0.59082 100 22.9766 100 50.5908
                   Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539
                   C95.2932 28.8227 92.871 24.3692 89.8167 20.348
                   C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289
                   C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124
                   C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873
                   C39.2613 1.69328 37.813 4.19778 38.4501 6.62326
                   C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071
                   C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491
                   C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552
                   C75.2735 17.9648 79.3347 21.5619 82.5849 25.841
                   C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758
                   C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Answers Section */}
      <div
        className="flex-grow w-full max-w-3xl mx-auto overflow-y-auto px-3 sm:px-5"
        ref={scrollToAns}
      >
        <div className="flex flex-col gap-4 sm:gap-5 py-4 sm:py-5">
          {result.map((entry, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Question bubble */}
              <div className="flex justify-end">
                <p className="text-white font-semibold p-2 sm:p-3 rounded-2xl rounded-br-none w-fit max-w-[85%] sm:max-w-sm md:max-w-md bg-zinc-800 text-sm sm:text-base">
                  {entry.question}
                </p>
              </div>

              {/* Answer bubble */}
              <div className="flex justify-start">
                <ul className="flex flex-col gap-2 sm:gap-3">
                  {entry.answers.map((ans, i) => (
                    <li
                      key={i}
                      className="text-green-700 dark:text-green-300 p-2 sm:p-3 w-full max-w-[90%] sm:max-w-lg rounded-xl shadow-md overflow-x-auto text-sm sm:text-base"
                    >
                      <ReactMarkdown
                        children={ans}
                        components={{
                          code({ inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={dark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-xl shadow-lg border border-gray-700 dark:border-gray-600 bg-zinc-950 dark:bg-zinc-900 p-3 sm:p-4 max-h-64 sm:max-h-96 overflow-auto text-xs sm:text-sm leading-relaxed"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code
                                className={`${className} bg-gray-200 dark:bg-zinc-800 text-pink-600 dark:text-green-300 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md font-mono text-xs sm:text-sm`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl right-auto center-auto left-auto mx-auto relative p-3 sm:p-5">
        <input
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          className="bg-blue-200 text-black dark:bg-black dark:text-white border-2 border-white h-12 sm:h-16 w-full rounded-2xl sm:rounded-3xl pr-16 pl-4 focus:outline-none focus:border-blue-300 transition text-sm sm:text-base"
        />
        <button
          className="absolute right-5 sm:right-7 font-bold top-1/2 -translate-y-1/2 h-9 sm:h-10 px-4 sm:px-5 cursor-pointer text-white bg-blue-600 dark:bg-black rounded-lg sm:rounded-xl text-sm sm:text-base transition"
          onClick={askQuestion}
        >
          Ask
        </button>
      </div>
    </div>
  );
}

export default QuestionAnswer;
