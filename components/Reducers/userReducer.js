const transData = [
  {
    amount: "110",
    description: "Ticket+ gey+ peanuts ",
    id: "orRv7UEITXlK0FRxQYdN",
    title: "Train to wgl",
  },
  {
    amount: "50",
    description: "To secu east ",
    id: "xW6xPVj7S28nUASzKdIu",
    title: "Metro",
  },
  {
    amount: "72",
    description: "Chapathi 6th jan",
    id: "aYTSFlXegYUI1YzR0gxm",
    title: "Lunch",
  },
  {
    amount: "240",
    description: "On jan 6th to uppal",
    id: "Y0cULTAX0khGEbGYiYfJ",
    title: "Bus to hyd ",
  },
  {
    amount: "30",
    description: "On jan 6th 2023",
    id: "N92c3127iNshB0VNAhQQ",
    title: "Auto to hnk bus stand ",
  },
  {
    amount: "165",
    description: "Bought eggs on 4th jan ",
    id: "nYGUT9iW4bQHOZEs9uWH",
    title: "Eggs",
  },
  {
    amount: "800",
    description: "Newyear party cost sent to bijay",
    id: "kYvPjw7hCxFxKKRxsXBM",
    title: "NewYear Party",
  },
  {
    amount: "282.49",
    description: "Internet bill on 2nd jan",
    id: "MYK6FBeqJyBJti2abJyf",
    title: "Internet bill",
  },
  {
    amount: "60",
    description: "Praneeth , me on 2nd jan ",
    id: "8buaSQ4CqfcWUK9h606y",
    title: "Tiffin ",
  },
  {
    amount: "8098",
    description: "Credit card on 1st jan",
    id: "W5Cn7ipvP7oHfwGF3aam",
    title: "Credit card bill",
  },
  {
    amount: "10",
    description: "In train., Gey came given",
    id: "EBQQssitmVuwHrzQFZJP",
    title: "Gey ",
  },
  {
    amount: "80",
    description: "Train to wgl -shathavahana ",
    id: "3T9mPOHT245KR5eY41C0",
    title: "Train cost to wgl",
  },
  {
    amount: "75",
    description: "Chicken manchuria lunch",
    id: "GILGPhCJCpmPY8hQWuvC",
    title: "Lunch on 30dec",
  },
  {
    amount: "100",
    description: "For gng and cmng ",
    id: "oJzXrOagFflyoY201QMd",
    title: "Metro cost",
  },
  {
    amount: "240",
    description: "Hnk to hyd bus cost",
    id: "nlPAb0xAs8GOSXi93GKy",
    title: "Bus to Hyd",
  },
  {
    amount: "30",
    description: "Auto to hnk for Hyderabad gng on 30 dec ",
    id: "cFOT0a1plT6rzRawjHlp",
    title: "Auto to hnk bus stand",
  },
];
export const GET_ALLTRANSACTIONS = "GET_ALLTRANSACTIONS";
export const DELETE_TRANS = "DELETE_TRANS";
export const ADD_BANK = "ADD_BANK";

export function reducer(state, action) {
  switch (action.type) {
    case "GETALL":
      return {
        ...state,
        transactions: transData,
        loading: false,
        error: null,
      };
    case GET_ALLTRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_PRODUCT":
      const updatedtransactions = state.transactions.map((product) => {
        console.log("updating product", action.payload);
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      return { ...state, transactions: updatedtransactions };
    case DELETE_TRANS:
      const remainingtransactions = state.transactions.filter(
        (product) => product.title !== action.payload.title
      );
      return { ...state, transactions: remainingtransactions };
    default:
      return state;

    case ADD_BANK:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        loading: false,
        error: null,
      };
  }
}

//export TranContext
