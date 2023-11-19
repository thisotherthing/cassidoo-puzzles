import { assertEquals } from "./utils.ts";

type Task = { name: string; duration: number };

const getTasksSum = (tasks: Task[], indices: number[]): number =>
  indices.reduce((prev, curr) => prev + tasks[curr].duration, 0);

const walkTasks = (
  tasks: Task[],
  target: number,
  pickedIndices: number[],
  startIndex: number,
  result: { taskIndices: number[] }
) => {
  const currentSum = getTasksSum(tasks, pickedIndices);

  // stop if duration is too long already
  if (currentSum > target) {
    return;
  }

  if (
    currentSum <= target &&
    pickedIndices.length > result.taskIndices.length
  ) {
    result.taskIndices.length = 0;
    result.taskIndices.push(...pickedIndices);
  }

  for (let i = startIndex, l = tasks.length; i < l; i++) {
    pickedIndices.push(i);
    walkTasks(tasks, target, pickedIndices, i + 1, result);
    pickedIndices.pop();
  }
};

const doTasks = (tasks: Task[], timeToWork: number): string[] => {
  const result = {
    taskIndices: [],
  };

  walkTasks(tasks, timeToWork, [], 0, result);

  return result.taskIndices.map((i) => tasks[i].name);
};

Deno.test("test", () => {
  assertEquals(
    doTasks(
      [
        { name: "Task 1", duration: 4 },
        { name: "Task 2", duration: 2 },
        { name: "Task 3", duration: 7 },
        { name: "Task 4", duration: 5 },
        { name: "Task 5", duration: 1 },
        { name: "Task 6", duration: 3 },
      ],
      6
    ),
    ["Task 2", "Task 5", "Task 6"]
  );
});
