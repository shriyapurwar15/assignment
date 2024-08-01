import { groupIdstore } from "@/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { LucideSendHorizontal } from "lucide-react";

interface Notes {
  _id: string;
  text: string;
  groupId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  parsedDate: string;
  _v: string | number;
}
interface group {
  _id: string;
  groupName: string;
  colorCode: string;
  shortName: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  _v: string | number;
}

const NotesPanel = () => {
  const groupId = groupIdstore((state: any) => state.groupId);
  const [notes, setNotes] = useState<Notes[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [group, setGroup] = useState<group>();
  const [text,setText] = useState("");
  const initialGenerater = async (groupName: string) => {
    const temp = groupName.split(" ");
    if (temp.length == 1) {
      return temp[0].charAt(0).toUpperCase();
    } else if (temp.length > 1) {
      return (
        temp[0].charAt(0).toUpperCase() + " " + temp[1].charAt(0).toUpperCase()
      );
    }
    return "GP";
  };

  const dateParser = async (date: string) => {
    // Parse the date string into a Date object
    const parsedDate = parseISO(date);

    // Format the Date object into the desired format
    const formattedDate = format(parsedDate, `d MMM yyyy • hh:mm a`);
    return formattedDate;
  };
  
  const handleClick = async ()=>{
    try {
      const data = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/notes/${groupId}/create`,{text:text});
      if(data){
        toast.success("note created");
        setText("");
        setRefresh(!refresh);
      } 
    } catch (error) {
      console.log(error);
      toast.error("unable to create note")
    }
  }
  const fetchNotes = async () => {
    try {
      setText("");
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/notes/${groupId}`
      );

      const tempData = data.group;
      tempData.shortName = await initialGenerater(tempData.groupName);
      for (let i = 0; i < data.notes.length; i++) {
        data.notes[i].parsedDate = await dateParser(data.notes[i].createdAt);
      }
      setNotes(data.notes);
      setGroup(tempData);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [groupId, refresh]);
  return (
    <div className="w-full  bg-[#dae5f5] h-full flex flex-col justify-between">
      <div >
        <div className="bg-[#001f8b] p-5 gap-4 w-full items-center flex  flex-row">
          <Avatar>
            <AvatarFallback
              className={` text-[#FFFFFF] font-medium  bg-[#0007bf]`}
            >
              {group?.shortName}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-[#ffffff] w-full text-2xl">
            {group?.groupName}
          </p>
        </div>

        <div style={{height : "30rem"}}  className="flex overflow-auto flex-col gap-5  p-5">
          <div className="flex flex-col gap-5">
            {notes.length > 0 &&
              notes.map((note) => (
                <div
                  key={note._id}
                  className="shadow-lg flex-col flex gap-2 rounded bg-[#ffffff] p-6 px-7"
                >
                  <p className="font-normal text-lg">{note.text}</p>
                  <p className="w-full flex justify-end font-medium text-lg items-end">
                    {note.parsedDate}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-[#001F8B] p-5  bottom-0 rounded-bl-md">
        <Textarea placeholder="Enter your text here..." value={text} onChange={(e)=>setText(e.target.value)} className="font-normal text-black text-2xl h-32"   />
      <Button disabled={text.length==0} className="bg-white text-gray-500 absolute cursor-pointer bottom-8 hover:bg-slate-200 right-6" onClick={handleClick}><LucideSendHorizontal/></Button>
      </div>
    </div>
  );
};

export default NotesPanel;
