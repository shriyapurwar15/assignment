import { create } from 'zustand'

export const useStore = create((set) => ({
  refresh: false,
  changeRefresh: () => set((state : any) => ({ refresh : !state.refresh })),
}))

type groupIdState={
  groupId : string;
  setGroupId : (newgroupId: string ) => void;
}

export const groupIdstore = create<groupIdState>((set)=>({
  groupId :"",
  setGroupId : (newGroupId : string)=>set(()=> ({groupId : newGroupId}))
  // : (id:string) => set((state :any) => ({ groupId: id }))
}))