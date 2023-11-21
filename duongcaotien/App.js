import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Switch, Button } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do App</Text>

      <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'column' }}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
          />
          <Button title="Add Task" onPress={addTask} />
        </View>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Switch
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
            />
            <Text style={styles.taskText}>{item.task}</Text>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  taskText: {
    marginLeft: 10,
  },
});

export default App;