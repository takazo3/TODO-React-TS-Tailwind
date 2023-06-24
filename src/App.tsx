import React, { useRef, useState } from "react";

import "./App.css";

function App() {
	const [inputValue, setInputValue] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef=useRef<HTMLInputElement>(null);

	type Todo = {
		inputValue: string;
		id: number;
		checked: boolean;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//NewTodoを作成
		const newTodo: Todo = {
			inputValue: inputValue,
			id: todos.length,
			checked: false,
		};
		if (newTodo.inputValue === "") {
			return false;
		}
		setTodos([newTodo, ...todos]);
		//入力値を空にする
		setInputValue("");
    //inputRefの値を空にする
    if(inputRef.current){
    inputRef.current.value="";
    }
	
	};

	const handleEdit = (id: number, inputValue: string) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.inputValue = inputValue;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleChecked = (id: number, checked: boolean) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.checked = !checked;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleDelete = (id: number) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	return (
		<div className="App">
			<div>
				<h1 className="text-5xl text-teal-600">TODO</h1>
				<p>with TypeScript</p>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						type="text"
						onChange={(e) => handleChange(e)}
            ref={inputRef}
						className="border-2 border-teal-500 h-10  rounded-lg px-3 py-1 ml-3 mt-10 "
						placeholder="入力してください"
					/>
					<input
						type="submit"
						value="追加"
						className="bg-teal-600 text-white rounded-lg px-3 py-1 ml-3"
					/>
				</form>
				<ul>
					{todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="text"
								onChange={(e) => handleEdit(todo.id, e.target.value)}
								className="border-2 border-orange-200 h-10  rounded-lg px-3 py-1 ml-3 mt-10 "
								value={todo.inputValue}
								disabled={todo.checked}
							/>
							<input
								type="checkbox"
								onChange={(e) => handleChecked(todo.id, todo.checked)}
								className="border-2 border-teal-500 h-5  rounded-lg px-3 py-5 ml-3 mt-10 "
							/>
							<button
								onClick={(e) => handleDelete(todo.id)}
								className="bg-orange-600 text-white rounded-lg px-3 py-1 ml-3"
							>
								削除
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
