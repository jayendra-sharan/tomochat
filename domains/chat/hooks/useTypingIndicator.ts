import { useEffect, useRef } from "react";
import { Subject, debounceTime } from "rxjs";
import { throttleTime, filter } from "rxjs";

export function useTypingIndicator({
  onTypingStart,
  onTypingStop
}: {
  onTypingStart: () => void,
  onTypingStop: () => void
}) {
  const typing$ = useRef(new Subject<string>());

  useEffect(() => {
    const stream$ = typing$.current.pipe(
      filter(text => text.trim().length > 2)
    );
    
    const startSub = stream$
      .pipe(throttleTime(2000))
      .subscribe(onTypingStart);
    
    const stopSub = stream$
      .pipe(debounceTime(3000))
      .subscribe(onTypingStop)
    
    return () => {
      startSub.unsubscribe();
      stopSub.unsubscribe();
    }
  }, [onTypingStart, onTypingStop])

  return (text: string) => {
    typing$.current.next(text)
  }
}
