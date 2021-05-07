const initialState = { contacts: [] };

export default function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "REFRESH":
      return { contacts: [] };

    case "ADD":
      nextState = {
        ...state,
        contacts: [...state.contacts, action.value],
      };
      return nextState;

    default:
      return state;
  }
}
