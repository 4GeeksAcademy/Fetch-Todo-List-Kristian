import React, { useState, useEffect } from "react";

const TodoList = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const [username, setUsername] = useState("");
	const [isUserCreated, setIsUserCreated] = useState(false);
	const url = `https://playground.4geeks.com/todo/users/${username}`;

	const handleDelete = (taskId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
			method: "DELETE"
		})
		.then(() => getTasks())
		.catch(err => console.error("There was an error deleting task:", err));
	};

	const handleCreateUser = () => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
		.then(res => {
			if (res.ok) {
				setIsUserCreated(true);
				getTasks();
			} else {
				alert("This user is already created");
				setIsUserCreated(true);
				getTasks();
			}
		})
		.catch(err => console.error("There was an error creating user:", err));
	};

	const getTasks = () => {
		fetch(url)
		.then(res => res.json())
		.then(data => {
			if (Array.isArray(data)) {
				setList(data);
			} else if (Array.isArray(data.todos)) {
				setList(data.todos);
			} else {
				console.error("Unexpected data structure:", data);
				setList([]);
			}
		})
		.catch(err => console.error("There was an error getting tasks:", err));
	};

	const createTask = (taskLabel) => {
		fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
			method: "POST",
			body: JSON.stringify({ label: taskLabel, is_done: false }),
			headers: { "Content-Type": "application/json" }
		})
		.then(() => {
			setTask("");
			getTasks();
		})
		.catch(err => console.error("There was an error creating task:", err));
	};

	useEffect(() => {
		if (isUserCreated) {
			getTasks();
		}
	}, [isUserCreated]);

	return (
		<div>
			{!isUserCreated && (
				<div>
					<h2 className="d-flex justify-content-center">Create or enter your username:</h2>
					<div className="kris-card">
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<button className="btn m-2 black" onClick={handleCreateUser}>Let's go</button>
					</div>
				</div>
			)}

			{isUserCreated && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (task.trim() === "") return;
						createTask(task);
					}}
				>
					<h1 className="d-flex justify-content-center">Todo List!</h1>
					<div className="kris-card">
						<input
							type="text"
							placeholder="What do you need to be done?"
							value={task}
							onChange={(e) => setTask(e.target.value)}
						/>
						<ul>
							{list.map((item) => (
								<li key={item.id} className="kris-li">
									{item.label}
									<button
										type="button"
										className="float-end kris-button"
										value={task}
										onClick={() => handleDelete(item.id)}
									>
										X
									</button>
								</li>
							))}
							<li className="kris-li">{list.length} item left</li>
						</ul>
					</div>
				</form>
			)}
		</div>	
	);
};

export default TodoList;