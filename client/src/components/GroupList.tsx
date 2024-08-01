import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import axios from "axios";
import { cn } from "@/lib/utils";
import { groupIdstore, useStore } from "@/store/store";

interface group {
  _id: string;
  groupName: string;
  colorCode: string;
  shortName: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  _v: string | number;
}

const GroupList = () => {
  const [groups, setGroups] = useState<group[]>([]);
  const groupId = groupIdstore((state : any)=>state.groupId);
  const setGroupId = groupIdstore((state : any)=>state.setGroupId);
  const refresh = useStore((state:any)=>state.refresh)
  const fetchGroups = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/group`
      );

      for (let i = 0; i < data.length; i++) {
        data[i].shortName = await initialGenerater(data[i].groupName);
      }
      setGroups(data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch groups!");
    }
  };

  const initialGenerater = async (groupName: string) => {

    const temp = groupName.split(" ");
    if (temp.length == 1) {
      return temp[0].charAt(0).toUpperCase();
    } else if (temp.length > 1) {
      return temp[0].charAt(0).toUpperCase() +" "+ temp[1].charAt(0).toUpperCase();
    }
    return "GP";
  };

  useEffect(() => {
    fetchGroups();
  }, [refresh]);

  const colorCodeCssProvider = (colorCode : string)=>{
    let css = "text-[#FFFFFF] font-medium "
    if(colorCode== "#0007bf"){
       css+= "bg-[#0007bf]"
    }
    else if(colorCode =="#b38bfa"){
      css+="bg-[#b38bfa]"
    }
    else if(colorCode =="#FF79F2"){
      css+= "bg-[#FF79F2]"
    }
    else if(colorCode =="#43E6FC"){
      css += "bg-[#43E6FC]"
    }
    else if(colorCode =="#F19576"){
      css += "bg-[#F19576]"
    }
    else if(colorCode=="#0047FF"){
      css += "bg-[#0047FF]"
    }
    else if(colorCode=="#6691FF"){
      css += "bg-[#6691FF]"
    }
    return css
  }

  return (
    <div  style={{width :"23rem"}}>

    <div style={{height : "40rem"}} className=" gap-2 overflow-auto flex-col  flex  transition-all">
      {groups.length > 0 &&
        groups.map((group) => (
          <div onClick={()=>setGroupId(group._id)} className={`flex py-4 rounded-xl px-8 cursor-pointer  flex-row items-center  w-full gap-5 ${group._id==groupId?"bg-[#dcdcdc]" :""}`} key={group._id}>
            <Avatar>
              <AvatarFallback
              // bg-[${group.colorCode}]
                className={
                  colorCodeCssProvider(group.colorCode)
                }
              >
                {group.shortName}
              </AvatarFallback>
            </Avatar>
            <p className="font-medium text-2xl">{group.groupName}</p>
          </div>
        ))}
    </div>
        </div>
  );
};

export default GroupList;
