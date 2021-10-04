const reducer = (state, action) => {
    switch (action.type) {

      case 'SET_STATE_LIST':
     
        const states= (action.payload).map((state)=>state.region.province).sort((a, b) => {
          if(a < b) return -1;
          if(a > b) return 1;
          
          return 0;
        })
        return {
          ...state,
          stateList:states, 
        };
        case 'SET_DEATH_LIST':

          state.deaths.unshift(action.payload?action.payload.deaths:0)
          let newDeaths=state.deaths
          return {
            ...state,
            deaths:newDeaths, 
          };
        case 'SET_STATE_DATA':
          const stateData= (action.payload).sort((a, b) => {
            if(a.region.province < b.region.province) return -1;
            if(a.region.province > b.region.province) return 1;
            return 0;
          })
          console.log(stateData.map((state)=>state.region.province))
                return {
                  ...state,
                  stateDataList:stateData,
              
                };
      case 'SET_DATE_LIST':
          state.dates.unshift(action.payload?action.payload.date:0)
          let newDates=state.dates
        return{
            ...state,
            dates:newDates,
        };

        case 'SET_CONFIRMED_LIST':
            state.confirmed.unshift(action.payload?action.payload.confirmed:0)
            let newConfirmed=state.confirmed
          return{
              ...state,
              confirmed:newConfirmed,
          };
        case 'SET_STATE_BYNAME': {
            let list=state.stateList;
            const stateListByName = list.filter((state) => state.toLowerCase().includes(action.payload.toLowerCase()));
            return { ...state, stateListByName };
          };
          case 'RESET_VALUES': 
            return { 
              ...state, 
            confirmed: [],
            dates:[],
            deaths:[],

            };
          
      default:
        return state;
    }
  };
  
  export default reducer;