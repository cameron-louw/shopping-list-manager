import React, { useState, useEffect } from 'react'
import './App.css'

function ShoppingListApp() {
  const [lists, setLists] = useState([
    { name: 'list1', items: ['milk', 'cookies'] },
    { name: 'list2', items: ['bread', 'butter'] },
    { name: 'list3', items: ['beer', 'snacks'] },
  ])
  const [inputValue, setInputValue] = useState({})

  useEffect(() => {
    // Loading Shopping Lists from Local Storage:
    const savedLists = JSON.parse(localStorage.getItem('shoppingLists'))

    if (savedLists) {
      setLists(savedLists)
    }
  }, [])

  useEffect(() => {
    // Saving Shopping Lists to Local Storage
    localStorage.setItem('shoppingLists', JSON.stringify(lists))
  }, [lists])

  const addItem = (listName) => {
    const newItem = inputValue[listName]?.trim()
    if (newItem) {
      setLists((prevLists) => {
        return prevLists.map((list) => {
          if (list.name === listName) {
            return {
              ...list,
              items: [...list.items, newItem],
            }
          }
          return list
        })
      })
      setInputValue((prevInputValue) => ({ ...prevInputValue, [listName]: '' }))
    }
  }

  const removeItem = (listName, index) => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.name === listName) {
          return {
            ...list,
            items: list.items.filter((_, i) => i !== index),
          }
        }
        return list
      })
    })
  }

  const editItem = (listName, index, newValue) => {
    setLists((prevLists) => {
      const listIndex = prevLists.findIndex((list) => list.name === listName)
      const updatedList = [...prevLists[listIndex].items]
      updatedList[index] = newValue
      const updatedLists = [...prevLists]
      updatedLists[listIndex].items = updatedList
      return updatedLists
    })
  }

  return (
    <div className="lists-container">
      {lists.map((list) => (
        <div className="single-list-container" key={list.name}>
          <h2>{list.name.toUpperCase()}</h2>
          <div className="list">
            <ul>
              {list.items.map((item, index) => (
                <li key={index}>
                  <div className="list-item">
                    <div className="item-buttons">
                      <button onClick={() => removeItem(list.name, index)}>
                        🗑
                      </button>
                      <button
                        onClick={() =>
                          editItem(
                            list.name,
                            index,
                            prompt('Enter new value', item)
                          )
                        }
                      >
                        ✎
                      </button>
                    </div>
                    {item}
                  </div>
                </li>
              ))}
            </ul>
            <div className="list-input">
              <input
                type="text"
                value={inputValue[list.name] || ''}
                onChange={(e) =>
                  setInputValue((prevInputValue) => ({
                    ...prevInputValue,
                    [list.name]: e.target.value,
                  }))
                }
                placeholder="Enter product name"
              />
              <button onClick={() => addItem(list.name)}>GO</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShoppingListApp
