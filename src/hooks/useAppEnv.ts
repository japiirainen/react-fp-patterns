import React, { useContext, useState } from 'react';
import { appEnv, AppEnv } from '../AppEnv';
import { E, Eq, pipe, RD, RT, RTE } from '../util/fpts';
import { useIO } from './useIO';

export const AppEnvContext = React.createContext(appEnv);

export const useAppEnv = () => {
   return useContext(AppEnvContext);
};
