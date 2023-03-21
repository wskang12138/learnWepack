// eslint-disable-next-line
export default (state = {}, action) => {
    switch (action.type) {
      case 'test': {
        return {
          test: action.payload
        }
      }
      // 默认
      default:
        return state;
    }
  };
