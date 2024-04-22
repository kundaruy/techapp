import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	FlatList, 
	StyleSheet, 
	Modal, 
} from "react-native"; 

const App = () => { 
	const [task, setTask] = useState(""); 
	const [priority, setPriority] = useState(""); 
	const [details, setDetails] = useState(""); 
	const [tasks, setTasks] = useState([]); 
	const [editIndex, setEditIndex] = useState(-1); 
	const [modalVisible, setModalVisible] = useState(false); 
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(null); 

	const handleAddTask = () => { 
		if (task.trim() !== "") { 
			if (editIndex !== -1) { 
				const updatedTasks = [...tasks]; 
				updatedTasks[editIndex] = { 
					task: task, 
					priority: priority, 
					details: details,
					completed: tasks[editIndex].completed 
				}; 
				setTasks(updatedTasks); 
				setEditIndex(-1); 
			} else { 
				setTasks([...tasks, { 
					task: task, 
					priority: priority, 
					details: details,
					completed: false 
				}]); 
			} 
			setTask(""); 
			setPriority(""); 
			setDetails(""); 
		} 
	}; 

	const handleEditTask = (index) => { 
		const { task, priority, details } = tasks[index]; 
		setTask(task); 
		setPriority(priority); 
		setDetails(details); 
		setEditIndex(index); 
		setModalVisible(true); 
		setSelectedTaskIndex(index); 
	}; 

	const handleDeleteTask = (index) => { 
		const updatedTasks = [...tasks]; 
		updatedTasks.splice(index, 1); 
		setTasks(updatedTasks); 
	}; 

	const handleToggleTask = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].completed = !updatedTasks[index].completed;
		setTasks(updatedTasks);
	};

	const handleClearCompleted = () => {
		const filteredTasks = tasks.filter(task => !task.completed);
		setTasks(filteredTasks);
	};

	const renderItem = ({ item, index }) => ( 
		<View style={styles.task}> 
			<TouchableOpacity onPress={() => handleToggleTask(index)}>
				<View style={[styles.checkbox, item.completed && styles.checkedBox]}></View>
			</TouchableOpacity>
			<View style={styles.taskDetails}>
				<Text style={[styles.itemList, item.completed && styles.completedTask]}>{item.task}</Text> 
				<Text style={styles.priority}>{item.priority}</Text>
				<Text style={styles.details}>{item.details}</Text>
			</View> 
			<View style={styles.taskButtons}> 
				<TouchableOpacity onPress={() => handleEditTask(index)}> 
					<Text style={styles.editButton}>Edit</Text> 
				</TouchableOpacity> 
				<TouchableOpacity onPress={() => handleDeleteTask(index)}> 
					<Text style={styles.deleteButton}>Delete</Text> 
				</TouchableOpacity> 
			</View> 
		</View> 
	); 

	return ( 
		<View style={styles.container}> 
			<View style={styles.header}>
      <Text style={styles.heading}> </Text>
				<Text style={styles.heading}>To Do Application</Text>
				<TextInput 
					style={styles.input} 
					placeholder="Task"
					value={task} 
					onChangeText={(text) => setTask(text)} 
				/> 
				<TextInput 
					style={styles.input} 
					placeholder="Priority"
					value={priority} 
					onChangeText={(text) => setPriority(text)} 
				/>
				<TextInput 
					style={styles.input} 
					placeholder="Details"
					value={details} 
					onChangeText={(text) => setDetails(text)} 
				/>
				<TouchableOpacity style={styles.addButton} onPress={handleAddTask}> 
					<Text style={styles.addButtonText}> 
						{editIndex !== -1 ? "Update Task" : "Add Task"} 
					</Text> 
				</TouchableOpacity> 
			</View>
			<FlatList 
				data={tasks} 
				renderItem={renderItem} 
				keyExtractor={(item, index) => index.toString()} 
			/> 
			<TouchableOpacity style={styles.clearButton} onPress={handleClearCompleted}>
				<Text style={styles.clearButtonText}>Clear Completed</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.modalContainer}>
					<TextInput
						style={styles.modalInput}
						placeholder="Edit task"
						value={task}
						onChangeText={(text) => setTask(text)}
					/>
					<TouchableOpacity style={styles.modalButton} onPress={() => {
						handleAddTask();
						setModalVisible(!modalVisible);
					}}>
						<Text style={styles.modalButtonText}>Save</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.modalButton} onPress={() => {
						setTask("");
						setModalVisible(!modalVisible);
					}}>
						<Text style={styles.modalButtonText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View> 
	); 
}; 

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 20, 
		backgroundColor: "#f0f0f0", 
	}, 
	header: {
		marginBottom: 20,
	},
	heading: { 
		fontSize: 28, 
		fontWeight: "bold", 
		marginBottom: 20, 
		color: "green", 
		textAlign: "center", 
	}, 
	input: { 
		backgroundColor: "#fff", 
		padding: 12, 
		marginBottom: 16, 
		borderRadius: 8, 
		fontSize: 16, 
	}, 
	addButton: { 
		backgroundColor: "green", 
		padding: 14, 
		borderRadius: 8, 
		marginBottom: 16, 
		alignItems: "center", 
	}, 
	addButtonText: { 
		color: "white", 
		fontWeight: "bold", 
		fontSize: 16, 
	}, 
	task: { 
		backgroundColor: "#fff", 
		padding: 16, 
		marginBottom: 12, 
		borderRadius: 8, 
		flexDirection: "row", 
		justifyContent: "space-between", 
		alignItems: "center", 
	}, 
	itemList: { 
		fontSize: 18, 
	}, 
	priority: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
		color: "blue",
	},
	details: {
		fontSize: 16,
		marginBottom: 4,
	},
	completedTask: {
		textDecorationLine: "line-through",
		color: "gray",
	}, 
	taskDetails: {
		flex: 1,
		marginRight: 10,
	},
	taskButtons: { 
		flexDirection: "row", 
	}, 
	editButton: { 
		color: "green", 
		fontWeight: "bold", 
		fontSize: 16, 
		marginRight: 16, 
	}, 
	deleteButton: { 
		color: "red", 
		fontWeight: "bold", 
		fontSize: 16, 
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#000",
		marginLeft: 10,
	},
	checkedBox: {
		backgroundColor: "green",
	},
	clearButton: {
		backgroundColor: "red",
		padding: 14,
		borderRadius: 8,
		marginTop: 10,
		alignItems: "center",
	},
	clearButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	// Added styles for modal
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalInput: {
		backgroundColor: 'white',
		padding: 12,
		marginBottom: 16,
		borderRadius: 8,
		fontSize: 16,
		width: '80%',
	},
	modalButton: {
		backgroundColor: 'green',
		padding: 14,
		borderRadius: 8,
		marginBottom: 10,
		width: '80%',
		alignItems: 'center',
	},
	modalButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
}); 

export default App;