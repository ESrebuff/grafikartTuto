import { ChangeEvent, useEffect, useState } from "react";

export function Timer() {

    const [duration, setDuration] = useState(5);
    const [secondsLeft, setSecondsLeft] = useState(duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(v => {
                if (v <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return v - 1;
            })
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [duration])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(event.target.value));
        setSecondsLeft(Number(event.target.value));
    };

  return (
    <div className="vstack gap-2">
        <input 
        value={duration}
        onChange={handleChange} 
        placeholder="Timer..."/>
        <p>Décompte : {secondsLeft}</p>
    </div>
  );
}
