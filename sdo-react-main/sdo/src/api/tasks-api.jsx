import { appApiIns } from "./app-api";

export function getTasks() {
    return appApiIns.get('/api/labs');
}

export function patchMark(task_id, student_id, new_mark) {
    return appApiIns.patch(`/api/teachers/task/${task_id}/student/${student_id}/mark`, {
        mark: new_mark
    })
}

export function deleteSolution(solution_id){
    console.log("Удаляем решение с ID:", solution_id);
    return appApiIns.delete(`/api/task/solution/${solution_id}`)
}