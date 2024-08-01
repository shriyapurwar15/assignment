import  { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

const GroupCreateButton = () => {
  const [groupName, setGroupName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const changeRefresh = useStore((state: any) => state.changeRefresh);
  const handleCancel = ()=>{
    setGroupName("");
    setColorCode("");
  }
  const handleClick = async () => {
    try {
      if (!groupName) {
        console.log("hello")
        toast.warn("Enter Groupname");
        return;
      } else if (!colorCode) {
        toast.warn("Choose a color");
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/group/create`,
        { groupName, colorCode }
      );
      if (data) {
        toast.success("group created successfully");
        handleCancel();
        changeRefresh();
      }
    } catch (error) {}
  };
  return (
    <>
    
    <AlertDialog>

      <AlertDialogTrigger className="absolute bg-[#16008b] bottom-6 left-72 text-white rounded-full p-5">
        {<PlusIcon />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New group</AlertDialogTitle>
          <AlertDialogDescription className="gap-5 flex-col flex">
            <div className="flex flex-row items-center gap-2 ">
              <Label htmlFor="groupname" className="w-1/4 text-black font-medium " >Group Name</Label>
              <Input id="groupname" value={groupName} onChange={(e)=>setGroupName(e.target.value)} placeholder="Enter group name" className="rounded-full text-black font-medium" name="groupname"/>
            </div>
            <div className="flex flex-row items-center gap-2 ">
              <Label htmlFor="colors" className="w-1/4 text-black font-medium " >Choose Color</Label>
              <div className="flex flex-row gap-2">
                <span onClick={()=>setColorCode("#b38bfa")} className={`bg-[#b38bfa] border-2 cursor-pointer  rounded-full p-4 ${colorCode=="#b38bfa"?` border-blue-700` :""} `}></span>
                <span onClick={()=>setColorCode("#FF79F2")} className={`bg-[#FF79F2] border-2 cursor-pointer  rounded-full p-4 ${colorCode=="#FF79F2"?`border-2 border-blue-700` :""} `}></span>
                <span onClick={()=>setColorCode("#43E6FC")} className={`bg-[#43E6FC] border-2 cursor-pointer  rounded-full p-4 ${colorCode=="#43E6FC"?`border-2 border-blue-700` :""} `}></span>
                <span onClick={()=>setColorCode("#F19576")} className={`bg-[#F19576] border-2 cursor-pointer  rounded-full p-4 ${colorCode=="#F19576"?`border-2 border-blue-700` :""} `}></span>
                <span onClick={()=>setColorCode("#0047FF")} className={`bg-[#0047FF] border-2 cursor-pointer  rounded-full p-4 ${colorCode=="#0047FF"?`border-2 border-blue-700` :""} `}></span>
                <span onClick={()=>setColorCode("#6691FF")} className={`bg-[#6691FF] border-2 cursor-pointer  rounded-full p-4 ${colorCode=="#6691FF"?`border-2 border-blue-700` :""} `}></span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={ handleCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#001f8b] text-sm"
            onClick={handleClick}
          >
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default GroupCreateButton;
