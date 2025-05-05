import React, { useState } from "react";

const TodoList = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	const handleDelete = (indexToDelete) => {
		const updatedList = list.filter((_, index) => index !== indexToDelete);
		setList(updatedList);
	}

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (task.trim() === "") return;
					setList([...list, task]);
					setTask("");
				}}
			>
				<h1 className="d-flex justify-content-center">Todo List!</h1>
				<div className="kris-card">
					<input type="text" placeholder="What do you need to be done?" value={task} onChange={(e) => setTask(e.target.value)} />
					<ul>
						{list.map((item, index) => (
							<li key={index} className="kris-li">
								{item} <button type="button" className="float-end kris-button" value={task} onClick={() => handleDelete(index)}>X</button>
							</li>
						))}
						<li className="kris-li">{list.length} item left</li>
					</ul>
				</div>
			</form>
		</div>
	);
};

export default TodoList;