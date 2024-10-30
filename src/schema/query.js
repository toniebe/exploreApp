import React from 'react';
import {useRealm} from '@realm/react';

export const useCallPlanOperations = () => {
  const realm = useRealm();

  const insertCallPlan = (newCallPlan, isUpdated) => {
    realm.write(() => {
      realm.create('CallPlan', newCallPlan, isUpdated);
    });
  };

  const deleteAll = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  const deleteCallPlan = MobileCallID => {
    realm.write(() => {
      let tempCall = realm
        .objects('CallPlan')
        .filtered(`MobileCallID == '${MobileCallID}'`);
      realm.delete(tempCall);
    });
  };

  const searchCallPlan = MobileCallID => {
    return realm
      .objects('CallPlan')
      .filtered(`MobileCallID == '${MobileCallID}'`);
  };

  return {insertCallPlan, deleteAll, deleteCallPlan, searchCallPlan};
};
