console.log(window.Redux)

const { createStore } = window.Redux;
//state
//reducer
//store
const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload);

            return newList;
        }
        default:
            return state;
    }
}

const store = createStore(hobbyReducer);

//render redux hobby list----
const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElement = document.querySelector('#hobbyListId');
    if (!ulElement) return;

    //reset previous content of ul
    ulElement.innerHTML = '';

    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;

        ulElement.appendChild(liElement);
    }
}

//render initial hobby list
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

//handle form submit
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
    const handleFormSubmit = (e) => {
        //prevent browser from reloading
        e.preventDefault();

        const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
        if (!hobbyTextElement) return;

        console.log('submit', hobbyTextElement.value);
        const action = {
            type: "ADD_HOBBY",
            payload: hobbyTextElement.value
        };
        store.dispatch(action);

        //reset form
        hobbyFormElement.reset();
    };

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    console.log('STATE UPDATE: ', store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);

    //save localstorage
    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
});