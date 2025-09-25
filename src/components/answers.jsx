import { useEffect, useState } from "react";

const Answers = ({ answer }) => {
    const [cleanAnswer, setCleanAnswer] = useState(answer);

    useEffect(() => {
        const cleaned = answer.replace(/\*/g, "").trim();
        setCleanAnswer(cleaned);
    }, [answer]);

    return (
        <div>
            <span className="block py-1">{cleanAnswer}</span>
        </div>
    );
};

export default Answers;
