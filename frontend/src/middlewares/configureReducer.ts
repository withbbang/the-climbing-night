import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import common, { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import auth, { AuthState } from 'middlewares/reduxToolkits/authSlice';
import sidebar, { SidebarState } from 'middlewares/reduxToolkits/sidebar';

const rootReducer = combineReducers({
  common,
  auth,
  sidebar,
  // add others...
});

/**
 * 새로고침 해도 state 변화 없도록 방지
 * key, storage필수
 * storage: localStorage를 사용하여 state 값 유지
 * whitelist: 유지하고 싶은 state값들
 * blacklist: 유지하지 않을 state값들
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'sidebar'], // add others...
};

/**
 * store에 넣을 새로운 persist reducer 반환
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

interface PropState {
  common: CommonState;
  auth: AuthState;
  sidebar: SidebarState;
  // add others...
}

export { persistedReducer, PropState };
