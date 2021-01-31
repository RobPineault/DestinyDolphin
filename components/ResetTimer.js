import { useState, useEffect } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

export default function ResetTimer() {
    const [resetCountdown, setResetCountdown] = useState("0:00:00:00");
    function timeDistance(startTime, endTime, unitSize) {
        if (startTime == endTime) {
            return 0;
        }
        if (startTime < endTime) {
            return endTime - startTime;
        }
        else {
            return unitSize + endTime - startTime;
        }
    }
    useEffect(() => {    
        var x;
        function startCountdown() {
            x = setInterval(function () {
                // Get today's date and time
                const now = new Date();

                const days = timeDistance(now.getDay(), 2, 7);
                const hours = timeDistance(now.getHours(), 13, 24);
                const minutes = timeDistance(now.getMinutes(), 0, 60);
                let seconds = timeDistance(now.getSeconds(), 0, 60);
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                // const countDownDate = new Date(2020, 10, 10, 13);

                // Find the distance between now and the count down date
                //const distance = countDownDate.getTime() - now.getTime();

                // Time calculations for days, hours, minutes and seconds
                //const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                //const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                //const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                //const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setResetCountdown(days + ":" + hours + ":" + minutes + ":" + seconds);

                // If the count down is finished, write some text 
                if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
                    clearInterval(x);
                    setResetCountdown("NEW ITEMS");
                    const timerEl = document.getElementById("timer");
                    timerEl.classList.toggle("timer-finished");
                    var count = 0;
                    const duration = setInterval(function () {
                        count++;
                        if (count == 10) {
                            timerEl.classList.toggle("timer-finished");
                            clearInterval(duration);
                            startCountdown();
                        }
                    }, 1000);
                }
            }, 1000);            
        }
        startCountdown();
        return () => clearInterval(x);
    }, [])

    return (
        <Card id="timer" className="timer">
            <Typography variant="h6" color="textPrimary">
                Weekly Reset: { resetCountdown }
            </Typography>
            </Card>
    )
}