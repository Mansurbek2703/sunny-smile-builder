export function trackAnswer(taskType: string, taskId: string, answerData: any, isCorrect?: boolean | null) {
  window.dispatchEvent(new CustomEvent('quest-answer', {
    detail: { taskType, taskId, answerData, isCorrect }
  }));
}
