
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TODOS } from '../utils/data.js';

export default function AllScreen(props) {

  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');

  const getTodoList = () => {
    AsyncStorage.setItem('work', JSON.stringify(TODOS))
    try{
      let work = AsyncStorage.getItem('work');
      let parsed = JSON.parse(work);
      const arrayTodo = Object.keys('work').map(i => work[i])
      setTodoList(arrayTodo);
    }catch(e) {
      alert(e)
    }
    return arrayTodo;
  }

  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
    setTimeout(() => {
      props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 500);
  };

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [newTodo, ...todoList];
    AsyncStorage.setItem('work', JSON.stringify(newTodoList))
    setTodoList(newTodoList);
    setTodoBody('');
  };

  return (
    <View style={styles.container}>
      <Text style = {{ fontWeight:'bold', fontSize: 20, marginTop:5}}> Add new Todo:  </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={todoBody}
          style={styles.todoInput}
          onChangeText={text => setTodoBody(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
        <Ionicons name="md-send" size={32} color="blue" />
        </TouchableOpacity>
      </View>
      <Text style = {{ fontWeight:'bold', fontSize: 20}}> All Todo:  </Text>
      <ScrollView>
          {todoList.map((todo, idx) => {
        return (
          <TodoItem
            idx={idx}
            todo={todo}
            key={todo.body}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
          />
        );
      })}
      </ScrollView>
    </View>
  );
}

AllScreen.navigationOptions = {
  title: 'TO DO LIST',
};

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '97%',
    minHeight: 20,
    color: 'white',
    borderRadius: 15,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '85%',
    minHeight: 30,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    height: 50,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5
  },
});

