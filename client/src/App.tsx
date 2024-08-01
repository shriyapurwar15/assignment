import "./App.css";
import GroupList from "./components/GroupList";
import GroupCreateButton from "./components/GroupCreateButton";
import { groupIdstore } from "./store/store";


import "react-toastify/dist/ReactToastify.css";
import NotesPanel from "./components/NotesPanel";
function App() {
  const groupId = groupIdstore((state : any)=>state.groupId);
  const setGroupId = groupIdstore((state : any)=>state.setGroupId);
  return (
    <>
      <section className="font-[roboto] transition-all">
        <div className="flex flex-row w-full">
          <div style={{width :"23rem"}} className="flex flex-col   w-2/5">
            <div className="flex-col items-center flex">
              <h1 onClick={()=>setGroupId("")} className=" cursor-pointer pt-10 mb-8  font-medium text-4xl">
                Pocket Notes
              </h1>
            </div>
            <div >
              <GroupList />
            </div>
          </div>
          <div className="h-screen w-full ">
            {groupId?<NotesPanel/>:<img
              src="./background.png"
              className="h-screen w-screen"
              alt="background img"
            />}
            
          </div>
        </div>
      </section>
      <GroupCreateButton />
    </>
  );
}

export default App;
